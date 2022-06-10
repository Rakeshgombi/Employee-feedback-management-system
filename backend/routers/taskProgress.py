from datetime import datetime
from typing import List

from db import TaskProgress, database
from fastapi import APIRouter, HTTPException, status
from inputSchemas import TaskProgressSchemaIn
from resSchemas import TaskProgressSchema

router = APIRouter(tags=["Task Progress"])


@router.get("/task_progress", response_model=List[TaskProgressSchema])
async def get_task_progresss():
    query = TaskProgress.select()
    return await database.fetch_all(query)


@router.get("/task_progress/{id}", response_model=TaskProgressSchema)
async def get_task_progress_detail(id: int):
    query = TaskProgress.select().where(TaskProgress.c.id == id)
    taskProgress = await database.fetch_one(query)
    if not taskProgress:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task Progress not found")
    return {**taskProgress}


@router.post("/task_progress", status_code=status.HTTP_201_CREATED, response_model=TaskProgressSchema)
async def create_task_progress(new_taskProgress: TaskProgressSchemaIn):
    query = TaskProgress.insert().values(
        task_id=new_taskProgress.task_id,
        progress=new_taskProgress.progress,
        is_completed=new_taskProgress.is_completed,
        date_created=datetime.now()
    )
    last_record_id = await database.execute(query)
    return {**new_taskProgress.dict(), "id": last_record_id, "date_created": str(datetime.now())}


@router.put("/task_progress/{id}", status_code=status.HTTP_201_CREATED, response_model=TaskProgressSchema)
async def update_task_progress(id: int, new_taskProgress: TaskProgressSchemaIn):
    query = TaskProgress.select().where(TaskProgress.c.id == id)
    taskProgress = await database.fetch_one(query)
    if taskProgress is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task Progress not found")
    else:
        query = TaskProgress.update().where(id == TaskProgress.c.id).values(
            task_id=new_taskProgress.task_id,
            progress=new_taskProgress.progress,
            is_completed=new_taskProgress.is_completed,
            date_created=datetime.now()
        )
        last_record_id = await database.execute(query)
        return {**new_taskProgress.dict(), "id": last_record_id, "date_created": str(datetime.now())}


@router.delete("/task_progress/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task_progress(id: int):
    query = TaskProgress.select().where(TaskProgress.c.id == id)
    taskProgress = await database.fetch_one(query)
    print(taskProgress)
    if taskProgress is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task Progress not found")

    query = TaskProgress.delete().where(TaskProgress.c.id == id)
    taskProgress = await database.execute(query)
    print({'detail': 'Task Progress deleted Successfully'})
    # return status.HTTP_204_NO_CONTENT
