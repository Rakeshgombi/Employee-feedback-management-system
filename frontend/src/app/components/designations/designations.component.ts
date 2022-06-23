import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faBarsProgress, faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { DesignationsService } from '../services/designations.service';
import { DesignationModel } from './designation.module';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.css']
})
export class DesignationsComponent implements OnInit {
  faAdd = faAdd
  faPencil = faPencil
  faEye = faEye
  faTrash = faTrash
  faBarsProgress = faBarsProgress
  showAdd: boolean = true;
  FormDesignation = new FormGroup({
    designation: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })
  designationList: any
  designationModelObject: DesignationModel = new DesignationModel()

  constructor(private designationService: DesignationsService) { }

  get designation() {
    return this.FormDesignation.get('designation')
  }
  get description() {
    return this.FormDesignation.get('description')
  }

  ngOnInit(): void {
    this.designationService.getAll()
      .subscribe({
        next: async (res) => {
          this.designationList = await res;
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })
  }

  trackByDesignation(index, designation) {
    return designation ? designation.id : undefined;
  }

  addDesignation() {

  }
  postDesignation() {
    this.designationModelObject.designation = this.FormDesignation.value.designation
    this.designationModelObject.description = this.FormDesignation.value.description
    this.designationService.create(this.designationModelObject)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert("Designation Created Successfully")
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
          this.FormDesignation.reset();
          let ref = document.getElementById('addDesignationCancel');
          ref?.click()
          this.ngOnInit()
        },
      })
  }

  onEditDesignation(designation) {
    this.showAdd = false
    this.designationModelObject.id = designation.id
    this.FormDesignation.controls['designation'].setValue(designation.designation)
    this.FormDesignation.controls['description'].setValue(designation.description)
  }

  updateDesignation() {
    this.designationModelObject.designation = this.FormDesignation.value.designation;
    this.designationModelObject.description = this.FormDesignation.value.description;

    this.designationService.update(this.designationModelObject.id, this.designationModelObject)
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
          this.FormDesignation.reset();
          let ref = document.getElementById('addDesignationCancel');
          ref?.click()
          this.ngOnInit()
          this.showAdd = true
        }
      })
  }

  deleteDesignation(id: number) {
    this.designationService.deleteById(id)
      .subscribe({
        next: async (res) => {
          this.ngOnInit()
          console.log(this.designationList);
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
