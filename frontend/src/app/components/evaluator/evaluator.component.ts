import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faBarsProgress, faCheck, faCircleExclamation, faEye, faPencil, faTrash, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { EvaluatorsService } from '../services/evaluators.service';
import { EvaluatorModel } from './evaluator.module';


@Component({
  selector: 'app-evaluators',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.css']
})

export class EvaluatorComponent implements OnInit {
  evaluatorlist: any;
  employeeDetails: any;
  employees = [];
  bodyText: string;
  evaluatorForm = new FormGroup({
    employee_id: new FormControl(0, Validators.required),
    first_name: new FormControl('', Validators.required),
    middle_name: new FormControl(''),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    avatar: new FormControl('')
  })
  evaluatorView: any;
  showAdd: boolean = true;
  evaluatorModelObject: EvaluatorModel = new EvaluatorModel();
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

  constructor(private evaluatorsService: EvaluatorsService) { }
  getAll: any;

  get evaluatorFName() {
    return this.evaluatorForm.get('first_name')
  }
  get evaluatorLName() {
    return this.evaluatorForm.get('last_name')
  }
  get employee_id() {
    return this.evaluatorForm.get('employee_id')
  }
  get email() {
    return this.evaluatorForm.get('email')
  }
  get password() {
    return this.evaluatorForm.get('password')
  }


  ngOnInit(): void {
    console.log(this.currentDate);

    this.evaluatorsService.getAll()
      .subscribe({
        next: async (res) => {
          this.evaluatorlist = await res;
          console.log(res);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })
  }

  trackByFn(index, evaluator) {
    return evaluator ? evaluator.id : undefined;
  }

  addEvaluator() {
    this.evaluatorForm.reset();    
    this.showAdd = true
  }

  postEvaluator() {
    this.evaluatorModelObject.employee_id = this.evaluatorForm.value.employee_id;
    this.evaluatorModelObject.first_name = this.evaluatorForm.value.first_name;
    this.evaluatorModelObject.last_name = this.evaluatorForm.value.last_name;
    this.evaluatorModelObject.middle_name = this.evaluatorForm.value.middle_name;
    this.evaluatorModelObject.last_name = this.evaluatorForm.value.last_name;
    this.evaluatorModelObject.email = this.evaluatorForm.value.email;
    this.evaluatorModelObject.password = this.evaluatorForm.value.password;
    this.evaluatorModelObject.avatar = (this.evaluatorForm.value.avatar ? this.evaluatorForm.value.avatar : '');
    console.log(this.evaluatorModelObject);

    this.evaluatorsService.create(this.evaluatorModelObject)
      .subscribe({
        next: (res) => {
          alert("Evaluator created successfully");
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
          this.evaluatorForm.reset();
          let ref = document.getElementById('addEvaluatorCancel');
          ref?.click()
          this.ngOnInit()
        }
      })
  }

  deleteEvaluator(id: number) {
    this.evaluatorsService.deleteById(id)
      .subscribe({
        next: async (res) => {
          this.ngOnInit()
          console.log(this.evaluatorlist);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Evaluator Not found");
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

  updateEvaluator() {
    this.evaluatorModelObject.employee_id = this.evaluatorForm.value.employee_id;
    this.evaluatorModelObject.first_name = this.evaluatorForm.value.first_name;
    this.evaluatorModelObject.last_name = this.evaluatorForm.value.last_name;
    this.evaluatorModelObject.middle_name = this.evaluatorForm.value.middle_name;
    this.evaluatorModelObject.last_name = this.evaluatorForm.value.last_name;
    this.evaluatorModelObject.email = this.evaluatorForm.value.email;
    this.evaluatorModelObject.password = this.evaluatorForm.value.password;
    this.evaluatorModelObject.avatar = (this.evaluatorForm.value.avatar ? this.evaluatorForm.value.avatar : '');

    this.evaluatorsService.update(this.evaluatorModelObject.id, this.evaluatorModelObject)
      .subscribe({
        next: (res) => {
          alert("Evaluator Updated successfully");
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Evaluator Not found");
          } else if (e instanceof BadRequestError) {
            alert("Bad request");
          }
          else throw e;
        },
        complete: () => {
          console.log('Complete')
          this.evaluatorForm.reset();
          let ref = document.getElementById('addEvaluatorCancel');
          ref?.click()
          this.ngOnInit()
          this.showAdd = true
        }
      })
  }
  
  onEditEvaluator(evaluator: any) {
    this.showAdd = false
    this.evaluatorModelObject.id = evaluator.id
    this.evaluatorForm.controls['employee_id'].setValue(evaluator.employee_id)
    this.evaluatorForm.controls['first_name'].setValue(evaluator.first_name)
    this.evaluatorForm.controls['middle_name'].setValue(evaluator.middle_name)
    this.evaluatorForm.controls['last_name'].setValue(evaluator.last_name)
    this.evaluatorForm.controls['email'].setValue(evaluator.email)
    this.evaluatorForm.controls['password'].setValue(evaluator.password)
    this.evaluatorModelObject.avatar = (this.evaluatorForm.value.avatar ? this.evaluatorForm.value.avatar : '');
  }

  viewEvaluator(evaluator: any) {
    console.log("viewEvaluator");
    this.evaluatorView = evaluator
  }
}

