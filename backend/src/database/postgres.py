"""
  postgresql module
"""

import psycopg

from config import get_settings


settings = get_settings()
conn_str = (
    f"host={settings.db_host} "
    f"port={settings.db_port} "
    f"dbname={settings.db_name} "
    f"user={settings.db_user} "
    f"password={settings.db_pass.get_secret_value()}"
)

async def get_postgres_connection():
    async with await psycopg.AsyncConnection.connect(conn_str) as db_connection:
        yield db_connection