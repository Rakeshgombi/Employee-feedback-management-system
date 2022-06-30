import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { EmployeesService } from '../services/employees.service';
import { EvaluationModule } from './evaluation.module';
import { faAdd, faBarsProgress, faCheck, faCircleExclamation, faEye, faPencil, faTrash, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EvaluationService } from '../services/evaluation.service';
import { TasksService } from '../services/tasks.service';
import { EvaluatorsService } from '../services/evaluators.service';


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})

export class EvaluationComponent implements OnInit {
  evaluationlist: any;
  tasklist: any
  employeeDetails: any;
  taskDetails: any;
  evaluatorsDetails: any;
  employees = [];
  tasks = [];
  evaluators = [];
  bodyText: string;
  evaluationForm = new FormGroup({
    employee_id: new FormControl(0, Validators.required),
    task_id: new FormControl(0, Validators.required),
    evaluator_id: new FormControl(0, Validators.required),
    efficiency: new FormControl(0, Validators.required),
    timeliness: new FormControl(0, Validators.required),
    quality: new FormControl(0, Validators.required),
    accuracy: new FormControl(0, Validators.required),
    remarks: new FormControl("", Validators.required),
  })
  evaluationView: any;
  showAdd: boolean = true;
  evaluationModelObject: EvaluationModule = new EvaluationModule();
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

  constructor(private evaluationService: EvaluationService, private employeesService: EmployeesService, private taskService: TasksService, private evaluatorsService: EvaluatorsService) { }
  getAll: any;

  // get evaluationName() {
  //   return this.evaluationForm.get('evaluation')
  // }


  ngOnInit(): void {
    console.log(this.currentDate);
    this.evaluationService.getAll()
      .subscribe({
        next: async (res) => {
          this.evaluationlist = await res;
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => {
          console.log('Complete');
          console.log("employeesService => ", this.employees);
          console.log("evaluatorsService => ", this.evaluators);
          console.log("taskService => ", this.tasks);
        }
      })
    this.employeesService.getAll()
      .subscribe({
        next: async (res) => {
          this.employeeDetails = await res;
          this.evaluationlist.forEach(element => {
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
    this.taskService.getAll()
      .subscribe({
        next: async (res) => {
          this.taskDetails = await res;
          this.evaluationlist.forEach(element => {
            let task_id = element["task_id"];
            this.taskDetails.forEach(task => {
              if (task["id"] === task_id) {
                this.tasks.push(task);
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
    this.evaluatorsService.getAll()
      .subscribe({
        next: async (res) => {
          this.evaluatorsDetails = await res;
          this.evaluationlist.forEach(element => {
            let evaluator_id = element["evaluator_id"];
            this.evaluatorsDetails.forEach(evaluator => {
              if (evaluator["id"] === evaluator_id) {
                this.evaluators.push(evaluator);
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
  trackByFn(index, evaluation) {
    return evaluation ? evaluation.id : undefined;
  }
  addEvaluation() {
    this.evaluationForm.reset();
    this.showAdd = true
  }
  postEvaluation() {
    this.evaluationModelObject.employee_id = this.evaluationForm.value.employee_id
    this.evaluationModelObject.task_id = this.evaluationForm.value.task_id
    this.evaluationModelObject.evaluator_id = this.evaluationForm.value.evaluator_id
    this.evaluationModelObject.efficiency = this.evaluationForm.value.efficiency
    this.evaluationModelObject.timeliness = this.evaluationForm.value.timeliness
    this.evaluationModelObject.quality = this.evaluationForm.value.quality
    this.evaluationModelObject.accuracy = this.evaluationForm.value.accuracy
    this.evaluationModelObject.remarks = this.evaluationForm.value.remarks

    console.log(this.evaluationModelObject);

    this.evaluationService.create(this.evaluationModelObject)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert("Evaluation created successfully");
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
          this.evaluationForm.reset();
          let ref = document.getElementById('addEvaluationCancel');
          ref?.click()
          this.ngOnInit()
        }
      })
  }

  deleteEvaluation(id: number) {
    this.evaluationService.deleteById(id)
      .subscribe({
        next: async (res) => {
          this.ngOnInit()
          console.log(this.evaluationlist);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Evaluation Not found");
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

  updateEvaluation() {
    this.evaluationModelObject.employee_id = this.evaluationForm.value.employee_id
    this.evaluationModelObject.task_id = this.evaluationForm.value.task_id
    this.evaluationModelObject.evaluator_id = this.evaluationForm.value.evaluator_id
    this.evaluationModelObject.efficiency = this.evaluationForm.value.efficiency
    this.evaluationModelObject.timeliness = this.evaluationForm.value.timeliness
    this.evaluationModelObject.quality = this.evaluationForm.value.quality
    this.evaluationModelObject.accuracy = this.evaluationForm.value.accuracy
    this.evaluationModelObject.remarks = this.evaluationForm.value.remarks


    this.evaluationService.update(this.evaluationModelObject.id, this.evaluationModelObject)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert("Evaluation Updated successfully");
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Evaluation Not found");
          } else if (e instanceof BadRequestError) {
            alert("Bad request");
          }
          else throw e;
        },
        complete: () => {
          console.log('Complete')
          this.evaluationForm.reset();
          let ref = document.getElementById('addEvaluationCancel');
          ref?.click()
          this.ngOnInit()
          this.showAdd = true
        }
      })
  }
  onEditEvaluation(evaluation: any) {
    this.showAdd = false
    this.evaluationModelObject.id = evaluation.id
    this.evaluationForm.controls["employee_id"].setValue(evaluation.employee_id)
    this.evaluationForm.controls["task_id"].setValue(evaluation.task_id)
    this.evaluationForm.controls["evaluator_id"].setValue(evaluation.evaluator_id)
    this.evaluationForm.controls["efficiency"].setValue(evaluation.efficiency)
    this.evaluationForm.controls["timeliness"].setValue(evaluation.timeliness)
    this.evaluationForm.controls["quality"].setValue(evaluation.quality)
    this.evaluationForm.controls["accuracy"].setValue(evaluation.accuracy)
    this.evaluationForm.controls["remarks"].setValue(evaluation.remarks)

  }

  viewEvaluation(evaluation: any) {
    console.log("viewEvaluation");
    this.evaluationView = evaluation
    console.log(this.evaluationView);
  }
}