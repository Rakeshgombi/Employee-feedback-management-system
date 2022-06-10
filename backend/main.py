from fastapi import FastAPI

from db import database, engine, metadata
from routers import (departments, designations, employees, evaluator, ratings,
                     systemSettings, taskProgress, tasks, users)

app = FastAPI()

metadata.create_all(engine)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/")
def read_root():
    return {"Working": "Fine"}


app.include_router(departments.router)
app.include_router(designations.router)
app.include_router(evaluator.router)
app.include_router(employees.router)
app.include_router(tasks.router) 
app.include_router(ratings.router)
app.include_router(systemSettings.router)
app.include_router(taskProgress.router)
app.include_router(users.router)
