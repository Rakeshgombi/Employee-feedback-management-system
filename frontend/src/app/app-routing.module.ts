import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SigninComponent } from './components/signin/signin.component';
import { EvaluatorComponent } from './components/evaluator/evaluator.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'designations', component: DesignationsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'evaluator', component: EvaluatorComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
