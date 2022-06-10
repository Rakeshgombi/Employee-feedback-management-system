from typing import List

from db import DesignationList, database
from fastapi import APIRouter, HTTPException, status
from inputSchemas import DesignationListSchemaIn
from resSchemas import DesignationListSchema

router = APIRouter(tags=["designations"])


@router.get("/designations", response_model=List[DesignationListSchema])
async def get_designations():
    query = DesignationList.select()
    return await database.fetch_all(query)


@router.get("/designations/{id}", response_model=DesignationListSchema)
async def get_designation_detail(id: int):
    query = DesignationList.select().where(DesignationList.c.id == id)
    designation = await database.fetch_one(query)
    if not designation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Designation not found")
    return {**designation}


@router.post("/designations", status_code=status.HTTP_201_CREATED, response_model=DesignationListSchema)
async def create_designation(designation: DesignationListSchemaIn):
    query = DesignationList.insert().values(designation=designation.designation,
                                            description=designation.description)
    last_record_id = await database.execute(query)
    return {**designation.dict(), "id": last_record_id}


@router.put("/designations/{id}", status_code=status.HTTP_201_CREATED, response_model=DesignationListSchema)
async def update_designation(id: int, new_designation: DesignationListSchemaIn):
    query = DesignationList.select().where(DesignationList.c.id == id)
    designation = await database.fetch_one(query)
    if designation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Designation not found")
    else:
        query = DesignationList.update().where(id == DesignationList.c.id).values(
            designation=new_designation.designation, description=new_designation.description)
        last_record_id = await database.execute(query)
        return {**new_designation.dict(), "id": last_record_id}


@router.delete("/designations/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_designation(id: int):
    query = DesignationList.select().where(DesignationList.c.id == id)
    designation = await database.fetch_one(query)
    print(designation)
    if designation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Designation not found")

    query = DesignationList.delete().where(DesignationList.c.id == id)
    designation = await database.execute(query)
    print({'detail': 'Designation deleted Successfully'})
    return status.HTTP_204_NO_CONTENT
