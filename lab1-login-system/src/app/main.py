from pathlib import Path
from typing import Any, Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

from .config import settings
from .schemas import LoginRequest, TokenResponse, UserPublic
from .security import create_access_token, decode_token, verify_password
from .user_repository import UserRepository


app = FastAPI(
    title="Lab 1: Login System",
    description="API that validates credentials, issues JWTs, and guards a protected endpoint.",
    version="0.1.0",
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

fixture_path = Path(__file__).resolve().parents[2] / "fixtures" / "users.json"
user_repo = UserRepository(fixture_path)


def authenticate_user(username: str, password: str) -> Optional[UserPublic]:
    user = user_repo.get_user(username)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return UserPublic(
        username=user.username,
        full_name=user.full_name,
        email=user.email,
    )


def get_current_user(token: str = Depends(oauth2_scheme)) -> UserPublic:
    try:
        payload = decode_token(token)
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    user = user_repo.get_user(payload.sub)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if user.disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is disabled")

    return UserPublic(username=user.username, full_name=user.full_name, email=user.email)


@app.post("/api/login", response_model=TokenResponse)
def login(credentials: LoginRequest) -> TokenResponse:
    user = authenticate_user(credentials.username, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(subject=user.username)
    expires_in = settings.access_token_expire_minutes * 60
    return TokenResponse(access_token=access_token, expires_in=expires_in)


@app.get("/api/me", response_model=UserPublic)
def read_current_user(current_user: UserPublic = Depends(get_current_user)) -> UserPublic:
    return current_user


@app.get("/api/health")
def health() -> dict[str, Any]:
    return {"status": "ok", "user_count": len(list(user_repo.list_users()))}
