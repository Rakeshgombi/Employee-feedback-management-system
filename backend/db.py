import datetime
import enum
from databases import Database
from sqlalchemy import (
    Enum,
    create_engine,
    MetaData,
    Table,
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    Boolean
)


DATABASE_URL = "mysql://root:@localhost/employees_fb_db"

engine = create_engine(DATABASE_URL)
metadata = MetaData()

DepartmentList = Table(
    "department_list",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("department", String(200), nullable=False),
    Column("description", String(500), nullable=False)
)

DesignationList = Table(
    "designation_list",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("designation", String(200), nullable=False),
    Column("description", String(500), nullable=False)
)

EvaluatorList = Table(
    "evaluator_list",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("employee_id", Integer, nullable=False, unique=True),
    Column("first_name", String(50), nullable=False),
    Column("middle_name", String(50), nullable=True),
    Column("last_name", String(50), nullable=False),
    Column("email", String(200), nullable=False, unique=True),
    Column("password", String(500), nullable=False),
    Column("avatar", String(500), nullable=True),
    Column("date_created", String(50), nullable=False)
)

EmployeeList = Table(
    "employee_list",
    metadata,
    Column("id", Integer, primary_key=True),
    # auto increment
    Column("employee_id", Integer, nullable=False,
           unique=True, default=21090000, autoincrement=True),
    Column("first_name", String(50), nullable=False),
    Column("middle_name", String(50), nullable=False),
    Column("last_name", String(50), nullable=False),
    Column("email", String(200), nullable=False, unique=True),
    Column("password", String(500), nullable=False),
    Column("department_id", Integer, ForeignKey("department_list.id")),
    Column("designation_id", Integer, ForeignKey("designation_list.id")),
    Column("evaluator_id", Integer, ForeignKey("evaluator_list.id")),
    Column("avatar", String(500), nullable=False),
    Column("date_created", String(50), nullable=False)
)


class TaskListOptions(enum.Enum):
    pending = 1
    cancelled = 2
    completed = 3


TaskList = Table(
    "task_list",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("task", String(200), nullable=False),
    Column("description", String(500), nullable=False),
    Column("employee_id", Integer, ForeignKey("employee_list.id")),
    Column("due_date", String(50), nullable=False),
    Column("completed", String(50), nullable=True),
    Column("status", Integer, Enum(TaskListOptions), nullable=False),
    Column("date_created", String(50), nullable=False)
)


Ratings = Table(
    "ratings",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("employee_id", Integer, ForeignKey(
        "employee_list.id"), nullable=False),
    Column("task_id", Integer, ForeignKey("task_list.id"), nullable=False),
    Column("evaluator_id", Integer, ForeignKey(
        "evaluator_list.id"), nullable=False),
    Column("efficiency", Integer, nullable=False),
    Column("timeliness", Integer, nullable=False),
    Column("quality", Integer, nullable=False),
    Column("accuracy", Integer, nullable=False),
    Column("remarks", String(500), nullable=False),
    Column("date_created", String(50), nullable=False)
)

SystemSettings = Table(
    "system_settings",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(100), nullable=False),
    Column('email', String(200), nullable=False),
    Column('contact', String(20), nullable=False),
    Column('address', String(500), nullable=False),
    Column("cover_img", String(500), nullable=False),
)


class TaskProgressOptions(enum.Enum):
    no = 0
    yes = 1


TaskProgress = Table(
    "task_progress",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("task_id", Integer, ForeignKey("task_list.id")),
    Column("progress", String(500), nullable=False),
    Column("is_completed", Boolean,  Enum(
        TaskProgressOptions), nullable=False),
    Column("date_created", String(50), nullable=False)
)

Users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("first_name", String(50), nullable=False),
    Column("last_name", String(50), nullable=False),
    Column("email", String(200), nullable=False, unique=True),
    Column("password", String(500), nullable=False),
    Column("avatar", String(500), nullable=False),
    Column("date_created", String(50), nullable=False)
)


database = Database(DATABASE_URL)
