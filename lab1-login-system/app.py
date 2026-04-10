import json
import os
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from flask import Flask, jsonify, request

from jwt_helper import encode_jwt


@dataclass(frozen=True)
class AuthConfig:
    secret: str
    algorithm: str = "HS256"
    expires_minutes: int = 15


def load_users(path: Path) -> List[Dict[str, str]]:
    if not path.exists():
        raise FileNotFoundError(f"{path} not found.")

    with path.open("r", encoding="utf-8") as source:
        raw = json.load(source)

    users = []
    for index, item in enumerate(raw):
        if not isinstance(item, dict):
            continue

        username = item.get("username")
        password = item.get("password")

        if not username or not password:
            continue

        users.append({"username": str(username), "password": str(password)})

    return users


def validate_login_payload(payload: Any) -> Tuple[Optional[str], Optional[str], Optional[str]]:
    if not isinstance(payload, dict):
        return None, None, "Request payload must be a JSON object."

    username = payload.get("username")
    password = payload.get("password")

    if not isinstance(username, str) or not username.strip():
        return None, None, "Username is required."

    if not isinstance(password, str) or not password.strip():
        return None, None, "Password is required."

    if len(password.strip()) < 6:
        return None, None, "Password must be at least 6 characters long."

    if len(username.strip()) < 3:
        return None, None, "Username must be at least 3 characters long."

    return username.strip(), password.strip(), None


def find_user(users: List[Dict[str, str]], username: str, password: str) -> Optional[Dict[str, str]]:
    for entry in users:
        if entry["username"] == username and entry["password"] == password:
            return entry

    return None


def build_token(config: AuthConfig, username: str) -> str:
    now = datetime.utcnow()
    payload = {
        "sub": username,
        "iat": now,
        "exp": now + timedelta(minutes=config.expires_minutes),
        "scope": "login"
    }
    payload_serializable = {
        "sub": payload["sub"],
        "iat": int(payload["iat"].timestamp()),
        "exp": int(payload["exp"].timestamp()),
        "scope": payload["scope"],
    }
    return encode_jwt(config.secret, payload_serializable)


def create_app() -> Flask:
    app = Flask(__name__)
    secret = os.getenv("JWT_SECRET", "lab1-login-secret")
    expiry = os.getenv("JWT_EXPIRY_MINUTES")
    expires_minutes = int(expiry) if expiry and expiry.isdigit() else 15

    config = AuthConfig(secret=secret, expires_minutes=expires_minutes)
    app.config["AUTH_CONFIG"] = config
    app.config["USERS"] = load_users(Path(__file__).parent / "users.json")


    @app.route("/")
    def home() -> Tuple[str, int]:
        return "Login API is running", 200


    @app.route("/login", methods=["POST"])
    def login():
        payload = request.get_json(silent=True)

        username, password, error = validate_login_payload(payload)
        if error:
            return jsonify({"error": error}), 400

        user = find_user(app.config["USERS"], username, password)
        if not user:
            return jsonify({"error": "Invalid credentials."}), 401

        try:
            token = build_token(config, username)
        except jwt.PyJWTError:
            return jsonify({"error": "Unable to generate authentication token."}), 500

        expires_at = datetime.utcnow() + timedelta(minutes=config.expires_minutes)

        return (
            jsonify(
                {
                    "token": token,
                    "expiresAt": expires_at.isoformat() + "Z",
                    "user": {"username": username}
                }
            ),
            200,
        )

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
