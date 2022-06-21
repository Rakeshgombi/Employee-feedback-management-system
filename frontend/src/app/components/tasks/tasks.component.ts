import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { EmployeesService } from '../services/employees.service';
import { TasksService } from '../services/tasks.service';
import { TaskModel } from './task.module';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  tasklist;
  employeeDetails;
  employees = [];
  bodyText: string;
  formValue: FormGroup;
  taskModelObject: TaskModel = new TaskModel();
  constructor(private tasksService: TasksService, private employeesService: EmployeesService, private formbuilder: FormBuilder) { }
  getAll: any;

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      task: [''],
      description: [''],
      employee_id: [''],
      due_date: [''],
      completed: [''],
      status: [''],
    });

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
            let employee_id = element["employee_id"] - 1;
            this.employees.push(this.employeeDetails[employee_id]["first_name"] + " " + this.employeeDetails[employee_id]["last_name"]);
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

  postTask() {
    this.taskModelObject.task = this.formValue.value.task;
    this.taskModelObject.description = this.formValue.value.description;
    this.taskModelObject.employee_id = this.formValue.value.employee_id;
    this.taskModelObject.due_date = this.formValue.value.due_date;
    this.taskModelObject.completed = this.formValue.value.completed;
    this.taskModelObject.status = this.formValue.value.status;
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
          this.formValue.reset();
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
            alert("Not found");
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

  onView(task: any) {
    this
  }
}

