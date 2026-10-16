"""
  config module
"""
from functools import lru_cache

from pydantic_settings import BaseSettings
from pydantic import SecretStr


class Settings(BaseSettings):
    db_host: str
    db_port: int
    db_name: str
    db_user: str
    db_pass: SecretStr

    backend_host: str
    backend_port: int

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()