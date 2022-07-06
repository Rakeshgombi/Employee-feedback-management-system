from datetime import datetime
from typing import List

from db import Users, database
from fastapi import APIRouter, HTTPException, status
from inputSchemas import UserSchemaIn
from resSchemas import UserSchema
from passlib.hash import pbkdf2_sha256

router = APIRouter(tags=["Users"])


@router.get("/users", response_model=List[UserSchema])
async def get_users():
    query = Users.select()
    return await database.fetch_all(query)


@router.get("/users/{id}", response_model=UserSchema)
async def get_user_detail(id: int):
    query = Users.select().where(Users.c.id == id)
    user = await database.fetch_one(query)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task Progress not found")
    return {**user}


def get_password_hash(password):
    return pbkdf2_sha256.hash(password)


@router.post("/users", status_code=status.HTTP_201_CREATED, response_model=UserSchema)
async def create_user(new_users: UserSchemaIn):
    query = Users.select().where(Users.c.email == new_users.email)
    user = await database.fetch_one(query)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
    query = Users.insert().values(
        first_name=new_users.first_name,
        last_name=new_users.last_name,
        email=new_users.email,
        password=get_password_hash(new_users.password),
        avatar=new_users.avatar,
        date_created=datetime.now()
    )
    last_record_id = await database.execute(query)
    return {**new_users.dict(), "id": last_record_id, "date_created": str(datetime.now())}


@router.put("/users/{id}", status_code=status.HTTP_201_CREATED, response_model=UserSchema)
async def update_user(id: int, new_users: UserSchemaIn):
    query = Users.select().where(Users.c.id == id)
    user = await database.fetch_one(query)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task Progress not found")
    else:
        query = Users.update().where(id == Users.c.id).values(
            first_name=new_users.first_name,
            last_name=new_users.last_name,
            email=new_users.email,
            avatar=new_users.avatar,
        )
        if new_users.password:
            query = Users.update().where(id == Users.c.id).values(
                password=get_password_hash(new_users.password),
            )

        last_record_id = await database.execute(query)
        return {**new_users.dict(), "id": id, "date_created": user.date_created}


@router.delete("/users/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(id: int):
    query = Users.select().where(Users.c.id == id)
    user = await database.fetch_one(query)
    print(user)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task Progress not found")

    query = Users.delete().where(Users.c.id == id)
    user = await database.execute(query)
