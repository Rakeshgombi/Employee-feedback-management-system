import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { EmployeesService } from '../services/employees.service';
import { TasksService } from '../services/tasks.service';
import { TaskModel } from './task.module';
import { faAdd, faBarsProgress, faCheck, faCircleExclamation, faEye, faPencil, faTrash, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  tasklist: any;
  employeeDetails: any;
  employees = [];
  bodyText: string;
  taskForm = new FormGroup({
    task: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    employee_id: new FormControl(0, Validators.required),
    due_date: new FormControl('', Validators.required),
    completed: new FormControl(''),
    status: new FormControl(0, Validators.required),
  })
  taskView: any;
  showAdd: boolean = true;
  taskModelObject: TaskModel = new TaskModel();
  yourDate = new Date()
  currentDate = this.yourDate.toISOString().split('T')[0]

  faAdd = faAdd
  faPencil = faPencil
  faTrash = faTrash
  faBarsProgress = faBarsProgress
  faTriangleExclamation = faTriangleExclamation
  faCheck = faCheck
  faCircleExclamation = faCircleExclamation
  faEye = faEye
  faXmark = faXmark

  constructor(private tasksService: TasksService, private employeesService: EmployeesService) { }
  getAll: any;

  get taskName() {
    return this.taskForm.get('task')
  }
  get description() {
    return this.taskForm.get('description')
  }
  get employee_id() {
    return this.taskForm.get('employee_id')
  }
  get dueDate() {
    return this.taskForm.get('due_date')
  }
  get status() {
    return this.taskForm.get('status')
  }

  ngOnInit(): void {
    console.log(this.currentDate);

    this.tasksService.getAll()
      .subscribe({
        next: async (res) => {
          this.tasklist = await res;
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })

    this.employeesService.getAll()
      .subscribe({
        next: async (res) => {
          this.employeeDetails = await res;
          this.tasklist.forEach(element => {
            let employee_id = element["employee_id"];
            this.employeeDetails.forEach(employee => {
              if (employee["id"] === employee_id) {
                this.employees.push(employee);
              }
            });
          });
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')

      })
  }
  trackByFn(index, task) {
    return task ? task.id : undefined;
  }
  addTask() {
    this.taskForm.reset();
    this.showAdd = true
  }
  postTask() {
    this.taskModelObject.task = this.taskForm.value.task;
    this.taskModelObject.description = this.taskForm.value.description;
    this.taskModelObject.employee_id = this.taskForm.value.employee_id;
    this.taskModelObject.due_date = this.taskForm.value.due_date;
    this.taskModelObject.completed = this.taskForm.value.completed ? this.taskForm.value.completed : '00-00-0000';
    this.taskModelObject.status = this.taskForm.value.status;
    console.log(this.taskModelObject);

    this.tasksService.create(this.taskModelObject)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert("Task created successfully");
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else if (e instanceof BadRequestError) {
            alert("Bad request");
          }
          else throw e;
        },
        complete: () => {
          console.log('Complete')
          this.taskForm.reset();
          let ref = document.getElementById('addTaskCancel');
          ref?.click()
          this.ngOnInit()
        }
      })
  }

  deleteTask(id: number) {
    this.tasksService.deleteById(id)
      .subscribe({
        next: async (res) => {
          this.ngOnInit()
          console.log(this.tasklist);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Task Not found");
          } else if (e instanceof BadRequestError) {
            alert("Bad request");
          }
          else throw e;
        },
        complete: () => {
          console.log('Complete')
        }
      })
  }

  updateTask() {
    this.taskModelObject.task = this.taskForm.value.task;
    this.taskModelObject.description = this.taskForm.value.description;
    this.taskModelObject.employee_id = this.taskForm.value.employee_id;
    this.taskModelObject.due_date = this.taskForm.value.due_date;
    this.taskModelObject.completed = this.taskForm.value.completed ? this.taskForm.value.completed : '00-00-0000';
    this.taskModelObject.status = this.taskForm.value.status;

    this.tasksService.update(this.taskModelObject.id, this.taskModelObject)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert("Task Updated successfully");
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Task Not found");
          } else if (e instanceof BadRequestError) {
            alert("Bad request");
          }
          else throw e;
        },
        complete: () => {
          console.log('Complete')
          this.taskForm.reset();
          let ref = document.getElementById('addTaskCancel');
          ref?.click()
          this.ngOnInit()
          this.showAdd = true
        }
      })
  }
  onEditTask(task: any) {
    this.showAdd = false
    this.taskModelObject.id = task.id
    this.taskForm.controls['task'].setValue(task.task)
    this.taskForm.controls['description'].setValue(task.description)
    this.taskForm.controls['employee_id'].setValue(task.employee_id)
    this.taskForm.controls['due_date'].setValue(task.due_date)
    this.taskForm.controls['completed'].setValue(task.completed)
    this.taskForm.controls['status'].setValue(task.status)
  }

  viewTask(task: any) {
    console.log("viewTask");
    this.taskView = task
    console.log(this.taskView);
  }
}