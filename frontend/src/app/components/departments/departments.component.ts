import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faBarsProgress, faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { DepartmentsService } from '../services/departments.service';
import { DepartmentModel } from './departmet.module';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  faAdd = faAdd
  faPencil = faPencil
  faEye = faEye
  faTrash = faTrash
  faBarsProgress = faBarsProgress
  showAdd: boolean = true;
  FormDepartment = new FormGroup({
    department: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })
  departmentList: any
  departmentModelObject: DepartmentModel = new DepartmentModel()

  constructor(private departmentService: DepartmentsService) { }

  get department() {
    return this.FormDepartment.get('department')
  }
  get description() {
    return this.FormDepartment.get('description')
  }

  ngOnInit(): void {
    this.departmentService.getAll()
      .subscribe({
        next: async (res) => {
          this.departmentList = await res;
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })
  }

  trackByDepartment(department) {
    return department ? department.id : undefined;
  }

  addDepartment() {
    this.FormDepartment.reset();
    this.showAdd = true
  }
  postDepartment() {
    this.departmentModelObject.department = this.FormDepartment.value.department
    this.departmentModelObject.description = this.FormDepartment.value.description
    this.departmentService.create(this.departmentModelObject)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert("Department Created Successfully")
        },
        error: (err: AppError) => {
          if (err instanceof NotFoundError) {
            alert("Not found");
          } else if (err instanceof BadRequestError) {
            alert("Bad request");
          }
          else throw err;
        },
        complete: () => {
          console.log('Complete')
          this.FormDepartment.reset();
          let ref = document.getElementById('addDepartmentCancel');
          ref?.click()
          this.ngOnInit()
        },
      })
  }

  onEditDepartment(department) {
    this.showAdd = false
    this.departmentModelObject.id = department.id
    this.FormDepartment.controls['department'].setValue(department.department)
    this.FormDepartment.controls['description'].setValue(department.description)
  }

  updateDepartment() {
    this.departmentModelObject.department = this.FormDepartment.value.department;
    this.departmentModelObject.description = this.FormDepartment.value.description;

    this.departmentService.update(this.departmentModelObject.id, this.departmentModelObject)
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
          this.FormDepartment.reset();
          let ref = document.getElementById('addDepartmentCancel');
          ref?.click()
          this.ngOnInit()
          this.showAdd = true
        }
      })
  }

  deleteDepartment(id: number) {
    this.departmentService.deleteById(id)
      .subscribe({
        next: async () => {
          this.ngOnInit()
          console.log(this.departmentList);
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
}
