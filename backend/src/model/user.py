"""
  user model module
"""
from pydantic import BaseModel


class User(BaseModel):
    user_id: int
    username: str
    email: str
    is_active: bool