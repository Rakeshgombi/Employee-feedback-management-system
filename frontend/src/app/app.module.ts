import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { EmployeesAddComponent } from './components/employees/employees-add/employees-add.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { UsersAddComponent } from './components/users/users-add/users-add.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { EvaluatorAddComponent } from './components/evaluator/evaluator-add/evaluator-add.component';
import { EvaluatorListComponent } from './components/evaluator/evaluator-list/evaluator-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppErrorHandler } from './components/common/app-error-handler';
import { DepartmentsService } from './components/services/departments.service';
import { DesignationsService } from './components/services/designations.service';
import { UsersService } from './components/services/users.service';
import { TasksService } from './components/services/tasks.service';
import { EmployeesService } from './components/services/employees.service';
import { EvaluatorsService } from './components/services/evaluators.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    DesignationsComponent,
    TasksComponent,
    ProductsComponent,
    DepartmentsComponent,
    EmployeesAddComponent,
    EmployeesListComponent,
    UsersAddComponent,
    UsersListComponent,
    EvaluationComponent,
    EvaluatorListComponent,
    EvaluatorAddComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],

  providers: [
    DepartmentsService,
    DesignationsService,
    UsersService,
    TasksService,
    EmployeesService,
    EvaluatorsService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
