from typing import List

from db import SystemSettings, database
from fastapi import APIRouter, HTTPException, status
from inputSchemas import SystemSettingsSchemaIn
from resSchemas import SystemSettingsSchema

router = APIRouter(tags=["System Settings"])


@router.get("/systemSettings", response_model=SystemSettingsSchema)
async def get_system_settings():
    query = SystemSettings.select(SystemSettings.c.id == 1)
    return await database.fetch_one(query)


@router.put("/systemSettings", status_code=status.HTTP_201_CREATED, response_model=SystemSettingsSchema)
async def update_tasklist(new_system_settings: SystemSettingsSchemaIn):
    query = SystemSettings.select().where(SystemSettings.c.id == 1)
    task = await database.fetch_one(query)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    else:
        query = SystemSettings.update().where(1 == SystemSettings.c.id).values(
            name=new_system_settings.name,
            email=new_system_settings.email,
            contact=new_system_settings.contact,
            address=new_system_settings.address,
            cover_img=new_system_settings.cover_img
        )
        last_record_id = await database.execute(query)
        return {**new_system_settings.dict(), "id": 1}


# @router.put("/systemSettings", status_code=status.HTTP_201_CREATED, response_model=SystemSettingsSchema)
