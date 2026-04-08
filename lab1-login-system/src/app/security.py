import base64
import hashlib
from datetime import datetime, timedelta

from jose import JWTError, jwt

from .config import settings
from .schemas import TokenPayload


def hash_password(password: str) -> str:
    salt = settings.password_salt.encode("utf-8")
    derived = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 120_000)
    return base64.b64encode(derived).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password


def create_access_token(subject: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)


def decode_token(token: str) -> TokenPayload:
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        return TokenPayload(**payload)
    except JWTError as exc:
        raise JWTError("Invalid authentication token") from exc
