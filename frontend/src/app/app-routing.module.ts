import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { EmployeesAddComponent } from './components/employees/employees-add/employees-add.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { EvaluatorAddComponent } from './components/evaluator/evaluator-add/evaluator-add.component';
import { EvaluatorListComponent } from './components/evaluator/evaluator-list/evaluator-list.component';
import { ProductsComponent } from './components/products/products.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UsersAddComponent } from './components/users/users-add/users-add.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'designations', component: DesignationsComponent },
  { path: 'employees-add', component: EmployeesAddComponent },
  { path: 'employees-list', component: EmployeesListComponent },
  { path: 'evaluator-add', component: EvaluatorAddComponent },
  { path: 'evaluator-list', component: EvaluatorListComponent },
  { path: 'users-add', component: UsersAddComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: '**', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
