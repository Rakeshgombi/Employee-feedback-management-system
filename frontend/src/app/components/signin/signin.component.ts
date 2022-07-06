import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotFoundError } from 'rxjs/internal/util/NotFoundError';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { LoginService } from '../services/login.service';
import { LoginModule } from './login.module';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  formLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  })
  FormObjectModel: LoginModule = new LoginModule()

  constructor(private loginService: LoginService, private router: Router) { }

  get email() {
    return this.formLogin.get('email')
  }
  get password() {
    return this.formLogin.get('password')
  }

  ngOnInit(): void {
  }

  onLoginPost() {
    this.FormObjectModel.email = this.formLogin.value.email
    this.FormObjectModel.password = this.formLogin.value.password
    console.log(this.FormObjectModel);

    this.loginService.create(this.FormObjectModel)
      .subscribe({
        next: (res) => {
          alert("Logged in successfully");
          localStorage.setItem('loginToken', res.access_token);
          this.router.navigate(['']);
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
          let ref = document.getElementById('addEvaluatorCancel');
          ref?.click()
          this.ngOnInit()
        }
      })
  }
}
