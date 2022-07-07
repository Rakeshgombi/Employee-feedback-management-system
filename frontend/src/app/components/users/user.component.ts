import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faBarsProgress, faCheck, faCircleExclamation, faEye, faPencil, faTrash, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';

import { UserService } from '../services/user.service';
import { UserModule } from './user.module';


@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  userlist: any;
  employeeDetails: any;
  employees = [];
  bodyText: string;
  showAdd: boolean = true;
  userForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl(''),
    avatar: new FormControl('')
  })
  userView: any;
  userModelObject: UserModule = new UserModule();
  yourDate = new Date()
  currentDate = this.yourDate.toISOString().split('T')[0]
  passwordReq: boolean = false;
  faAdd = faAdd
  faPencil = faPencil
  faTrash = faTrash
  faBarsProgress = faBarsProgress
  faTriangleExclamation = faTriangleExclamation
  faCheck = faCheck
  faCircleExclamation = faCircleExclamation
  faEye = faEye
  faXmark = faXmark

  constructor(private userService: UserService) { }
  getAll: any;

  get userFName() {
    return this.userForm.get('first_name')
  }
  get userLName() {
    return this.userForm.get('last_name')
  }
  get email() {
    return this.userForm.get('email')
  }


  ngOnInit(): void {
    console.log(this.currentDate);

    this.userService.getAll()
      .subscribe({
        next: async (res) => {
          this.userlist = await res;
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })
  }

  trackByFn(index, user) {
    return user ? user.id : undefined;
  }

  addUser() {
    this.userForm.reset();
    this.showAdd = true;
    this.email.errors['required']
  };
  postUser() {
    this.userModelObject.first_name = this.userForm.value.first_name;
    this.userModelObject.last_name = this.userForm.value.last_name;
    this.userModelObject.last_name = this.userForm.value.last_name;
    this.userModelObject.email = this.userForm.value.email;
    this.userModelObject.password = this.userForm.value.password;
    this.userModelObject.avatar = (this.userForm.value.avatar ? this.userForm.value.avatar : '');
    console.log(this.userModelObject);

    this.userService.create(this.userModelObject)
      .subscribe({
        next: (res) => {
          alert("User created successfully");
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
          this.userForm.reset();
          let ref = document.getElementById('addUserCancel');
          ref?.click()
          this.ngOnInit()
        }
      })
  }

  deleteUser(id: number) {
    this.userService.deleteById(id)
      .subscribe({
        next: async (res) => {
          this.ngOnInit()
          console.log(this.userlist);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("User Not found");
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

  updateUser() {
    this.userModelObject.first_name = this.userForm.value.first_name;
    this.userModelObject.last_name = this.userForm.value.last_name;
    this.userModelObject.last_name = this.userForm.value.last_name;
    this.userModelObject.email = this.userForm.value.email;
    this.userModelObject.password = this.userForm.value.password ? this.userForm.value.password : '';
    this.userModelObject.avatar = (this.userForm.value.avatar ? this.userForm.value.avatar : '');

    this.userService.update(this.userModelObject.id, this.userModelObject)
      .subscribe({
        next: (res) => {
          alert("User Updated successfully");
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("User Not found");
          } else if (e instanceof BadRequestError) {
            alert("Bad request");
          }
          else throw e;
        },
        complete: () => {
          console.log('Complete')
          this.userForm.reset();
          let ref = document.getElementById('addUserCancel');
          ref?.click()
          this.ngOnInit()
          this.showAdd = true
        }
      })
  }

  onEditUser(user: any) {
    this.showAdd = false
    this.userModelObject.id = user.id
    this.userForm.controls['first_name'].setValue(user.first_name)
    this.userForm.controls['last_name'].setValue(user.last_name)
    this.userForm.controls['email'].setValue(user.email)
    this.userForm.controls['password'].setValue(user.password)
    this.userModelObject.avatar = (this.userForm.value.avatar ? this.userForm.value.avatar : '');
  }

  viewUser(user: any) {
    console.log("viewUser");
    this.userView = user
  }
}

