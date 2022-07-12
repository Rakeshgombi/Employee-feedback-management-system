from datetime import datetime
from typing import List
from routers.users import get_password_hash

from db import EmployeeList, database
from fastapi import APIRouter, HTTPException, status
from inputSchemas import EmployeeListSchemaIn
from resSchemas import EmployeeListSchema

router = APIRouter(tags=["employees"])


@router.get("/employees", response_model=List[EmployeeListSchema])
async def get_employees():
    query = EmployeeList.select()
    return await database.fetch_all(query)


@router.get("/employees/{id}", response_model=EmployeeListSchema)
async def get_employee_details(id: int):
    query = EmployeeList.select().where(EmployeeList.c.id == id)
    employee = await database.fetch_one(query)
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    return {**employee}


@router.post("/employees", status_code=status.HTTP_201_CREATED, response_model=EmployeeListSchema)
async def create_employee(new_employee: EmployeeListSchemaIn):
    query = EmployeeList.insert().values(
        employee_id=new_employee.employee_id,
        first_name=new_employee.first_name,
        middle_name=new_employee.middle_name,
        last_name=new_employee.last_name,
        email=new_employee.email,
        password=get_password_hash(new_employee.password),
        department_id=new_employee.department_id,
        designation_id=new_employee.designation_id,
        evaluator_id=new_employee.evaluator_id,
        avatar=new_employee.avatar,
        date_created=datetime.now()
    )
    last_record_id = await database.execute(query)
    return {**new_employee.dict(), "id": last_record_id, "date_created": str(datetime.utcnow())}


@router.put("/employees/{id}", status_code=status.HTTP_201_CREATED, response_model=EmployeeListSchema)
async def update_employee(id: int, new_employee: EmployeeListSchemaIn):
    query = EmployeeList.select().where(EmployeeList.c.id == id)
    employee = await database.fetch_one(query)
    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="employee not found")
    else:
        query = EmployeeList.update().where(id == EmployeeList.c.id).values(
            # update only the fields that are not null
            employee_id=new_employee.employee_id or employee.employee_id,
            first_name=new_employee.first_name or employee.first_name,
            middle_name=new_employee.middle_name or employee.middle_name,
            last_name=new_employee.last_name or employee.last_name,
            email=new_employee.email or employee.email,
            password=get_password_hash(new_employee.password or employee.password),
            department_id=new_employee.department_id or employee.department_id,
            designation_id=new_employee.designation_id or employee.designation_id,
            evaluator_id=new_employee.evaluator_id or employee.evaluator_id,
            avatar=new_employee.avatar
        )
        last_record_id = await database.execute(query)
        print(last_record_id)
        return {**new_employee.dict(), "id": last_record_id, "date_created": employee.date_created}


@router.delete("/employees/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_employee(id: int):
    query = EmployeeList.select().where(EmployeeList.c.id == id)
    employee = await database.fetch_one(query)
    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")

    query = EmployeeList.delete().where(EmployeeList.c.id == id)
    employee = await database.execute(query)
