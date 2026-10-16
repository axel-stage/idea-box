import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from psycopg.rows import class_row

from config import get_settings
from database.postgres import get_postgres_connection
from model.user import User


settings = get_settings()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://frontend:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/user")
async def get_users(db_connection=Depends(get_postgres_connection)):
    async with db_connection.cursor(row_factory=class_row(User)) as cursor:
        await cursor.execute("""
          SELECT * FROM dev.user;
        """)
        users = await cursor.fetchall()
    return users


@app.get("/user/{id}")
async def get_user(
      id: str,
      db_connection=Depends(get_postgres_connection)
    ):
    async with db_connection.cursor(row_factory=class_row(User)) as cursor:
        await cursor.execute("""
          SELECT
              *
          FROM dev.user
          WHERE user_id = %s;
        """, [id])
        users = await cursor.fetchone()
    return users


if __name__ == "__main__":
  uvicorn.run(
      app="main:app",
      host=settings.backend_host,
      port=settings.backend_port,
      reload=True
  )
