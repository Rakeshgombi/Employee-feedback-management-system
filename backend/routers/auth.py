from typing import List

from db import EmployeeList, Users, database
from fastapi import APIRouter, HTTPException, status
from passlib.hash import pbkdf2_sha256
from resSchemas import LoginSchema

from routers.token import create_access_token

router = APIRouter(tags=["auth"])


def verify_password(plain_password, hashed_password):
    return pbkdf2_sha256.verify(plain_password, hashed_password)


@router.post("/login")
async def login(request: LoginSchema):
    query = Users.select().where(Users.c.email == request.email)
    user = await database.fetch_one(query=query)
    role = 'admin'
    print(user)
    if not user:
        query = Users.select().where(EmployeeList.c.email == request.email)
        user = await database.fetch_one(query=query)
        role = 'employee'
        print(user)
    if not user:
        query = Users.select().where(EmployeeList.c.email == request.email)
        user = await database.fetch_one(query=query)
        role = 'evaluator'
        print(user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Password")
    access_token = create_access_token(data={"role": role})
    return {"access_token": access_token, "token_type": "bearer"}



