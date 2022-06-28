import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppErrorHandler } from './components/common/app-error-handler';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DepartmentsService } from './components/services/departments.service';
import { DesignationsService } from './components/services/designations.service';
import { EmployeesService } from './components/services/employees.service';
import { EvaluatorsService } from './components/services/evaluators.service';
import { TasksService } from './components/services/tasks.service';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SigninComponent } from './components/signin/signin.component';
import { EvaluatorComponent } from './components/evaluator/evaluator.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { UserComponent } from './components/users/user.component';
import { UserService } from './components/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    DesignationsComponent,
    TasksComponent,
    DepartmentsComponent,
    EmployeesComponent,
    UserComponent,
    EvaluationComponent,
    NotFoundComponent,
    SigninComponent,
    EvaluatorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],

  providers: [
    DepartmentsService,
    DesignationsService,
    UserService,
    TasksService,
    EmployeesService,
    EvaluatorsService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
