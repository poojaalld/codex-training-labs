from pydantic import BaseSettings


class Settings(BaseSettings):
    secret_key: str = "lab1-login-secret"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    password_salt: str = "lab1-static-salt"


settings = Settings()
