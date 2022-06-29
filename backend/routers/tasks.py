from datetime import datetime
from typing import List

from db import Ratings, TaskList, database
from fastapi import APIRouter, HTTPException, status
from inputSchemas import TaskListSchemaIn
from resSchemas import TaskListSchema

router = APIRouter(tags=["tasklist"])


@router.get("/tasklist", response_model=List[TaskListSchema])
async def get_tasklist():
    query = TaskList.select()
    return await database.fetch_all(query)


@router.get("/tasklist/{id}", response_model=TaskListSchema)
async def get_task_detail(id: int):
    query = TaskList.select().where(TaskList.c.id == id)
    task = await database.fetch_one(query)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Evaluator not found")
    return {**task}


@router.post("/tasklist", status_code=status.HTTP_201_CREATED, response_model=TaskListSchema)
async def create_tasklist(new_tasklist: TaskListSchemaIn):
    print(new_tasklist)
    query = TaskList.insert().values(
        task=new_tasklist.task,
        description=new_tasklist.description,
        employee_id=int(new_tasklist.employee_id),
        due_date=new_tasklist.due_date,
        completed=new_tasklist.completed,
        status=int(new_tasklist.status),
        date_created=str(datetime.now())
    )
    last_record_id = await database.execute(query)
    return {**new_tasklist.dict(), "id": last_record_id, "date_created": str(datetime.now())}


@router.put("/tasklist/{id}", status_code=status.HTTP_201_CREATED, response_model=TaskListSchema)
async def update_tasklist(id: int, new_tasklist: TaskListSchemaIn):
    query = TaskList.select().where(TaskList.c.id == id)
    task = await database.fetch_one(query)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    else:
        query = TaskList.update().where(id == TaskList.c.id).values(
            task=new_tasklist.task,
            description=new_tasklist.description,
            employee_id=new_tasklist.employee_id,
            due_date=new_tasklist.due_date,
            completed=new_tasklist.completed,   
            status=new_tasklist.status
        )
        last_record_id = await database.execute(query)
        return {**new_tasklist.dict(), "id": id, "date_created": task.date_created}


@router.delete("/tasklist/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_tasklist(id: int):
    tasklist_query = TaskList.select().where(TaskList.c.id == id)
    tasklist = await database.fetch_one(tasklist_query)
    if tasklist is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    taskProgress_query = TaskList.select()
    TaskProgress = await database.fetch_all(taskProgress_query)

    ratings_query = Ratings.select()
    ratings = await database.fetch_all(ratings_query)

    tasklist_ids = [rating.task_id for rating in ratings]
    tasklist_ids.append([rating.task_id for rating in ratings])

    if id in tasklist_ids:
        raise HTTPException( 
            status_code=status.HTTP_400_BAD_REQUEST, detail="This Task is assigned to some other Records")

    query = TaskList.delete().where(TaskList.c.id == id)
    await database.execute(query)
