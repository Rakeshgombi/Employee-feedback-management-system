from typing import List

from db import DepartmentList, database, EmployeeList
from fastapi import APIRouter, HTTPException, status
from inputSchemas import DepartmentListSchemaIn
from resSchemas import DepartmentListSchema

router = APIRouter(tags=["departments"])


@router.get("/departments", response_model=List[DepartmentListSchema])
async def get_departments():
    query = DepartmentList.select()
    return await database.fetch_all(query)


@router.get("/departments/{id}", response_model=DepartmentListSchema)
async def get_department_detail(id: int):
    query = DepartmentList.select().where(DepartmentList.c.id == id)
    department = await database.fetch_one(query)
    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Department not found")
    return {**department}


@router.post("/departments", status_code=status.HTTP_201_CREATED, response_model=DepartmentListSchema)
async def create_department(department: DepartmentListSchemaIn):
    query = DepartmentList.insert().values(department=department.department,
                                           description=department.description)
    last_record_id = await database.execute(query)
    return {**department.dict(), "id": last_record_id}


@router.put("/departments/{id}", status_code=status.HTTP_201_CREATED, response_model=DepartmentListSchema)
async def update_department(id: int, new_department: DepartmentListSchemaIn):
    query = DepartmentList.select().where(DepartmentList.c.id == id)
    department = await database.fetch_one(query)
    if department is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Department not found")
    else:
        query = DepartmentList.update().where(id == DepartmentList.c.id).values(
            department=new_department.department, description=new_department.description)
        last_record_id = await database.execute(query)
        return {**new_department.dict(), "id": last_record_id}


@router.delete("/departments/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_department(id: int):
    query = DepartmentList.select().where(DepartmentList.c.id == id)
    department = await database.fetch_one(query)
    print(department)
    if department is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Department not found")

    employees_query = EmployeeList.select()
    employees = await database.fetch_all(employees_query)

    department_ids = [employee.department_id for employee in employees]

    if id in department_ids:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Department is assigned to some other table")

    query = DepartmentList.delete().where(DepartmentList.c.id == id)
    department = await database.execute(query)
    print({'detail': 'Department deleted Successfully'})
    return status.HTTP_204_NO_CONTENT
