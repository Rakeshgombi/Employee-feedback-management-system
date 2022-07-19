from pydantic import BaseModel


class DepartmentListSchemaIn(BaseModel):
    department: str
    description: str

    class Config:
        orm_mode = True


class DesignationListSchemaIn(BaseModel):
    designation: str
    description: str

    class Config:
        orm_mode = True


class EmployeeListSchemaIn(BaseModel):
    employee_id: int
    first_name: str
    middle_name: str | None = None
    last_name: str
    email: str
    password: str | None = None
    department_id: int
    designation_id: int
    evaluator_id: int
    avatar: str

    class Config:
        orm_mode = True


class EvaluatorListSchemaIn(BaseModel):
    employee_id: int
    first_name: str
    middle_name: str
    last_name: str
    email: str
    password: str
    avatar: str

    class Config:
        orm_mode = True


class RatingsSchemaIn(BaseModel):
    employee_id: int
    task_id: int
    evaluator_id: int
    efficiency: int
    timeliness: int
    quality: int
    accuracy: int
    remarks: str

    class Config:
        orm_mode = True


class TaskListSchemaIn(BaseModel):
    task: str
    description: str
    employee_id: int
    due_date: str
    completed: str
    status: int

    class Config:
        orm_mode = True


class SystemSettingsSchemaIn(BaseModel):
    name: str
    email: str
    contact: str
    address: str
    cover_img: str

    class Config:
        orm_mode = True


class TaskProgressSchemaIn(BaseModel):
    task_id: int
    progress: str
    is_completed: bool

    class Config:
        orm_mode = True


class UserSchemaIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    avatar: str

    class Config:
        orm_mode = True
