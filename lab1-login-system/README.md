# Lab 1: Login System

A minimal FastAPI service that validates credentials, issues JWT access tokens, and guards a protected /api/me endpoint. Students should expand on this starter by connecting to a real user store, improving password handling, and adding refresh tokens later in the course.

## Requirements & validation
- POST /api/login accepts JSON with username (3-32 chars) and password (>=8 chars).
- Incorrect credentials or disabled accounts return 401 Unauthorized with a WWW-Authenticate: Bearer header.
- Successful logins return a JWT (ccess_token) that expires in 30 minutes plus 	oken_type/expires_in metadata.
- /api/me requires a valid bearer token and surfaces only the user identity — no password data leaks.

## Starter files
- src/app/main.py configures the FastAPI app, login route, JWT guards, and a health endpoint.
- src/app/security.py builds and validates tokens plus hashes passwords (PBKDF2 + salt) so students can learn why hashing is necessary.
- src/app/user_repository.py loads the fixture data from ixtures/users.json and exposes helpers to look up users.
- src/app/schemas.py documents the request/response shapes and keeps validation rules centralized.
- ixtures/users.json contains two demo users (demo-user and disabled-user) with PBKDF2/SHA-256 hashed passwords.
- 	ests/test_login.py shows how to exercise the API with FastAPI’s TestClient (requires pytest).

## Running locally
`ash
python -m venv .venv
.venv/scripts/activate # Windows
pip install -r requirements.txt
cd lab1-login-system
uvicorn src.app.main:app --reload --port 8000
`

## Testing the starter
`ash
cd lab1-login-system
pytest tests/test_login.py
`

## Sample credentials (from ixtures/users.json)
- username: demo-user
- password: secret123

Use these credentials when hitting /api/login to get a JWT and then call /api/me with Authorization: Bearer <token>.
