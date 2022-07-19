from datetime import datetime
from typing import List
from routers.users import get_password_hash

from db import EmployeeList, EvaluatorList, Ratings, database
from fastapi import APIRouter, HTTPException, status
from inputSchemas import EvaluatorListSchemaIn
from resSchemas import EvaluatorListSchema

router = APIRouter(tags=["evaluator"])


@router.get("/evaluators", response_model=List[EvaluatorListSchema])
async def get_evaluators():
    query = EvaluatorList.select()
    return await database.fetch_all(query)


@router.get("/evaluators/{id}", response_model=EvaluatorListSchema)
async def get_evaluator_details(id: int):
    query = EvaluatorList.select().where(EvaluatorList.c.id == id)
    evaluator = await database.fetch_one(query)
    if evaluator is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Evaluator not found")
    return {**evaluator}


@router.post("/evaluators", status_code=status.HTTP_201_CREATED, response_model=EvaluatorListSchema)
async def create_evaluator(new_evaluator: EvaluatorListSchemaIn):
    print(new_evaluator)
    query = EvaluatorList.insert().values(
        employee_id=int(new_evaluator.employee_id),
        first_name=new_evaluator.first_name,
        middle_name=new_evaluator.middle_name,
        last_name=new_evaluator.last_name,
        email=new_evaluator.email.lower(),
        password=get_password_hash(new_evaluator.password),
        avatar=new_evaluator.avatar,
        date_created=datetime.now()
    )
    last_record_id = await database.execute(query)
    return {**new_evaluator.dict(), "id": last_record_id, "date_created": str(datetime.now())}


@router.put("/evaluators/{id}", status_code=status.HTTP_201_CREATED, response_model=EvaluatorListSchema)
async def update_evaluator(id: int, new_evaluator: EvaluatorListSchemaIn):
    query = EvaluatorList.select().where(EvaluatorList.c.id == id)
    evaluator = await database.fetch_one(query)
    if evaluator is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="employee not found")
    else:
        query = EvaluatorList.update().where(id == EvaluatorList.c.id).values(
            employee_id=new_evaluator.employee_id or evaluator.employee_id,
            first_name=new_evaluator.first_name or evaluator.first_name,
            middle_name=new_evaluator.middle_name or evaluator.middle_name,
            last_name=new_evaluator.last_name or evaluator.last_name,
            email=new_evaluator.email.lower() or evaluator.email,
            avatar=new_evaluator.avatar,
        )
        if new_evaluator.password:
            query = query.values(password=get_password_hash(new_evaluator.password))
        else:
            query = query.values(password=evaluator.password)
        last_record_id = await database.execute(query)
        return {**new_evaluator.dict(), "id": id, "date_created": evaluator.date_created}


@router.delete("/evaluators/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_evaluator(id: int):
    evaluator_query = EvaluatorList.select().where(EvaluatorList.c.id == id)
    evaluator = await database.fetch_one(evaluator_query)

    if evaluator is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Evaluator not found")

    employees_query = EmployeeList.select()
    employees = await database.fetch_all(employees_query)

    ratings_query = Ratings.select()
    ratings = await database.fetch_all(ratings_query)

    evaluator_ids = [employee.evaluator_id for employee in employees]
    evaluator_ids.append([ratings.evaluator_id for ratings in ratings])

    if id in evaluator_ids:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Evaluator is assigned to some other table")

    query = EvaluatorList.delete().where(EvaluatorList.c.id == id)
    evaluator = await database.execute(query)
