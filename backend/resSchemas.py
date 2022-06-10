from pydantic import BaseModel


class DepartmentListSchema(BaseModel):
    id: int
    department: str
    description: str

    class Config:
        orm_mode = True


class DesignationListSchema(BaseModel):
    id: int
    designation: str
    description: str

    class Config:
        orm_mode = True


class EmployeeListSchema(BaseModel):
    id: int
    employee_id: int
    first_name: str
    middle_name: str
    last_name: str
    email: str
    password: str
    department_id: int
    designation_id: int
    evaluator_id: int
    avatar: str
    date_created: str

    class Config:
        orm_mode = True


class EvaluatorListSchema(BaseModel):
    id: int
    employee_id: int
    first_name: str
    middle_name: str
    last_name: str
    email: str
    password: str
    avatar: str
    date_created: str

    class Config:
        orm_mode = True


class RatingsSchema(BaseModel):
    id: int
    employee_id: int
    task_id: int
    evaluator_id: int
    efficiency: int
    timeliness: int
    quality: int
    accuracy: int
    remarks: str
    date_created: str

    class Config:
        orm_mode = True


class SystemSettingsSchema(BaseModel):
    id: int
    name: str
    email: str
    contact: str
    address: str
    cover_img: str

    class Config:
        orm_mode = True


class TaskListSchema(BaseModel):
    id: int
    task: str
    description: str
    employee_id: int
    due_date: str
    completed: str
    status: int
    date_created: str

    class Config:
        orm_mode = True


class TaskProgressSchema(BaseModel):
    id: int
    task_id: int
    progress: str
    is_completed: bool
    date_created: str

    class Config:
        orm_mode = True


class UserSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    password: str
    avatar: str
    date_created: str

    class Config:
        orm_mode = True
