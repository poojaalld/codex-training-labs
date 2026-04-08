from fastapi.testclient import TestClient

from src.app.main import app

client = TestClient(app)


def test_successful_login_returns_token():
    response = client.post(
        "/api/login",
        json={"username": "demo-user", "password": "secret123"},
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["token_type"] == "bearer"
    assert payload["expires_in"] == 1800
    assert "access_token" in payload


def test_invalid_credentials_are_rejected():
    response = client.post(
        "/api/login",
        json={"username": "demo-user", "password": "wrongpass"},
    )
    assert response.status_code == 401


def test_protected_endpoint_requires_token():
    response = client.get("/api/me")
    assert response.status_code == 401


def test_me_endpoint_returns_user_summary():
    token_response = client.post(
        "/api/login",
        json={"username": "demo-user", "password": "secret123"},
    )
    token = token_response.json()["access_token"]
    response = client.get("/api/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["username"] == "demo-user"
