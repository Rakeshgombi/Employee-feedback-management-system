import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faBarsProgress, faCheck, faCircleExclamation, faEye, faPencil, faTrash, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { DepartmentsService } from '../services/departments.service';
import { DesignationsService } from '../services/designations.service';
import { EmployeesService } from '../services/employees.service';
import { EvaluatorsService } from '../services/evaluators.service';
import { EmployeeModule } from './employees.module';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
  employeelist: any;
  employeeDetails: any;
  departmentDetails: any;
  designationsDetails: any;
  departments = [];
  designations = [];
  evaluators = [];


  private passwordValidators = [];

  employeeForm = new FormGroup({
    employee_id: new FormControl(0, Validators.required),
    first_name: new FormControl('', Validators.required),
    middle_name: new FormControl(''),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', this.passwordValidators),
    department_id: new FormControl(0, Validators.required),
    designation_id: new FormControl(0, Validators.required),
    evaluator_id: new FormControl(0, Validators.required),
    avatar: new FormControl('')
  })

  employeeView: any;
  showAdd: boolean = true;
  employeeModelObject: EmployeeModule = new EmployeeModule();
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
  evaluatorsDetails: any;

  constructor(private employeesService: EmployeesService, private departmentService: DepartmentsService, private designationsService: DesignationsService, private evaluatorsService: EvaluatorsService) { }
  getAll: any;

  get employeeFName() {
    return this.employeeForm.get('first_name')
  }
  get employeeLName() {
    return this.employeeForm.get('last_name')
  }
  get employee_id() {
    return this.employeeForm.get('employee_id')
  }
  get email() {
    return this.employeeForm.get('email')
  }
  get password() {
    return this.employeeForm.get('password')
  }
  get department_id() {
    return this.employeeForm.get('department_id')
  }
  get designation_id() {
    return this.employeeForm.get('designation_id')
  }
  get evaluator_id() {
    return this.employeeForm.get('evaluator_id')
  }


  ngOnInit(): void {
    // console.log(this.currentDate);

    this.employeesService.getAll()
      .subscribe({
        next: async (res) => {
          this.employeelist = await res;
          // console.log(res);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })


    this.departmentService.getAll()
      .subscribe({
        next: async (res) => {
          this.departmentDetails = await res;
          this.employeelist?.forEach(element => {
            let department_id = element["department_id"];
            this.departmentDetails?.forEach(department => {
              if (department["id"] === department_id) {
                this.departments.push(department);
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

    this.designationsService.getAll()
      .subscribe({
        next: async (res) => {
          this.designationsDetails = await res;
          this.employeelist?.forEach(element => {
            let designation_id = element["designation_id"];
            this.designationsDetails?.forEach(designation => {
              if (designation["id"] === designation_id) {
                this.designations.push(designation);
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
          console.log(this.evaluatorsDetails);
          this.employeelist?.forEach(element => {
            let evaluator_id = element["evaluator_id"];
            this.evaluatorsDetails?.forEach(evaluator => {
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

  trackByFn(employee) {
    return employee ? employee.id : undefined;
  }

  addEmployee() {
    
    this.employeeForm.get('password').setValidators(this.passwordValidators.concat(Validators.required))
    this.employeeForm.reset();
    this.showAdd = true
  }

  postEmployee() {
    this.employeeModelObject.employee_id = this.employeeForm.value.employee_id;
    this.employeeModelObject.first_name = this.employeeForm.value.first_name;
    this.employeeModelObject.last_name = this.employeeForm.value.last_name;
    this.employeeModelObject.middle_name = this.employeeForm.value.middle_name;
    this.employeeModelObject.last_name = this.employeeForm.value.last_name;
    this.employeeModelObject.email = this.employeeForm.value.email;
    this.employeeModelObject.password = this.employeeForm.value.password;
    this.employeeModelObject.evaluator_id = this.employeeForm.value.evaluator_id;
    this.employeeModelObject.designation_id = this.employeeForm.value.designation_id;
    this.employeeModelObject.department_id = this.employeeForm.value.department_id;
    this.employeeModelObject.avatar = (this.employeeForm.value.avatar ? this.employeeForm.value.avatar : '');
    // console.log(this.employeeModelObject);

    this.employeesService.create(this.employeeModelObject)
      .subscribe({
        next: () => {
          alert("Employee created successfully");
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
          this.employeeForm.reset();
          let ref = document.getElementById('addEmployeeCancel');
          ref?.click()
          this.ngOnInit()
        }
      })
  }

  deleteEmployee(id: number) {
    this.employeesService.deleteById(id)
      .subscribe({
        next: async () => {
          this.ngOnInit()
          // console.log(this.employeelist);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Employee Not found");
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

  updateEmployee() {
    this.employeeModelObject.employee_id = this.employeeForm.value.employee_id;
    this.employeeModelObject.first_name = this.employeeForm.value.first_name;
    this.employeeModelObject.last_name = this.employeeForm.value.last_name;
    this.employeeModelObject.middle_name = this.employeeForm.value.middle_name;
    this.employeeModelObject.last_name = this.employeeForm.value.last_name;
    this.employeeModelObject.email = this.employeeForm.value.email;
    this.employeeModelObject.password = this.employeeForm.value.password;
    this.employeeModelObject.department_id = this.employeeForm.value.department_id;
    this.employeeModelObject.designation_id = this.employeeForm.value.designation_id;
    this.employeeModelObject.evaluator_id = this.employeeForm.value.evaluator_id;
    this.employeeModelObject.avatar = (this.employeeForm.value.avatar ? this.employeeForm.value.avatar : '');

    

    this.employeesService.update(this.employeeModelObject.id, this.employeeModelObject)
      .subscribe({
        next: () => {
          alert("Employee Updated successfully");
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Employee Not found");
          } else if (e instanceof BadRequestError) {
            alert("Bad request");
          }
          else throw e;
        },
        complete: () => {
          console.log('Complete')
          this.employeeForm.reset();
          let ref = document.getElementById('addEmployeeCancel');
          ref?.click()
          this.ngOnInit()
          this.showAdd = true
        }
      })
  }

  onEditEmployee(employee: any) {
    this.showAdd = false
    this.employeeModelObject.id = employee.id
    this.employeeForm.controls['employee_id'].setValue(employee.employee_id)
    this.employeeForm.controls['first_name'].setValue(employee.first_name)
    this.employeeForm.controls['middle_name'].setValue(employee.middle_name)
    this.employeeForm.controls['last_name'].setValue(employee.last_name)
    this.employeeForm.controls['email'].setValue(employee.email)
    this.employeeForm.controls['evaluator_id'].setValue(employee.evaluator_id)
    this.employeeForm.controls['designation_id'].setValue(employee.designation_id)
    this.employeeForm.controls['department_id'].setValue(employee.department_id)
    this.employeeModelObject.avatar = (this.employeeForm.value.avatar ? this.employeeForm.value.avatar : '');

    
    this.employeeForm.get('password').setValidators(this.passwordValidators)
  }

  onCloseEditEmployee() {

    this.showAdd = true
  }

  viewEmployee(employee: any) {
    console.log("viewEmployee");
    this.employeeView = employee
  }
}

