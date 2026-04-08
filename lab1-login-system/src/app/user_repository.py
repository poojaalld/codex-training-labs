import json
from pathlib import Path
from typing import Dict, Iterable, Optional

from .schemas import UserAccount


class UserRepository:
    def __init__(self, fixture_path: Path) -> None:
        self._path = fixture_path
        self._users: Dict[str, UserAccount] = {}
        self._load()

    def _load(self) -> None:
        if not self._path.exists():
            raise FileNotFoundError(f"User fixture not found: {self._path}")

        try:
            raw = json.loads(self._path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise ValueError("Unable to parse user fixture") from exc

        for entry in raw:
            user = UserAccount(**entry)
            self._users[user.username] = user

    def get_user(self, username: str) -> Optional[UserAccount]:
        return self._users.get(username)

    def list_users(self) -> Iterable[UserAccount]:
        return self._users.values()
