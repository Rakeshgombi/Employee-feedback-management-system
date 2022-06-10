from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException, status
from db import Ratings, database
from inputSchemas import RatingsSchemaIn
from resSchemas import RatingsSchema

router = APIRouter(tags=["ratings"])


@router.get("/ratings", response_model=List[RatingsSchema])
async def get_ratings():
    query = Ratings.select()
    return await database.fetch_all(query)


@router.get("/ratings/{id}", response_model=RatingsSchema)
async def get_ratings(id: int):
    query = Ratings.select()
    return await database.fetch_one(query)


@router.post("/ratings", status_code=status.HTTP_201_CREATED, response_model=RatingsSchema)
async def create_ratings(new_ratings: RatingsSchemaIn):
    query = Ratings.insert().values(
        employee_id=new_ratings.employee_id,
        task_id=new_ratings.task_id,
        evaluator_id=new_ratings.evaluator_id,
        efficiency=new_ratings.efficiency,
        timeliness=new_ratings.timeliness,
        quality=new_ratings.quality,
        accuracy=new_ratings.accuracy,
        remarks=new_ratings.remarks,
        date_created=datetime.now()
    )
    last_record_id = await database.execute(query)
    return {**new_ratings.dict(), "id": last_record_id, "date_created": str(datetime.now())}


@router.put("/ratings/{id}", status_code=status.HTTP_201_CREATED, response_model=RatingsSchema)
async def update_ratings(id: int, new_ratings: RatingsSchemaIn):
    print(new_ratings.dict())
    query = Ratings.select().where(Ratings.c.id == id)
    print(query)
    ratings = await database.fetch_one(query)
    print(ratings)
    if ratings is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="ratings not found")
    else:
        query = Ratings.update().where(id == Ratings.c.id).values(
            employee_id=new_ratings.employee_id,
            task_id=new_ratings.task_id,
            evaluator_id=new_ratings.evaluator_id,
            efficiency=new_ratings.efficiency,
            timeliness=new_ratings.timeliness,
            quality=new_ratings.quality,
            accuracy=new_ratings.accuracy,
            remarks=new_ratings.remarks,
            date_created=datetime.now()
        )
        last_record_id = await database.execute(query)
        return {**new_ratings.dict(), "id": last_record_id, "date_created": str(datetime.now())}


@ router.delete("/ratings/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_ratings(id: int):
    query = Ratings.select().where(Ratings.c.id == id)
    ratings = await database.fetch_one(query)
    if ratings is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="ratings not found")
    else:
        query = Ratings.delete().where(id == Ratings.c.id)
        await database.execute(query)
