import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { EvaluatorComponent } from './components/evaluator/evaluator.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RoleGuard } from './components/services/role.guard';
import { SigninComponent } from './components/signin/signin.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UserComponent } from './components/users/user.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [RoleGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [RoleGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'evaluation', component: EvaluationComponent, canActivate: [RoleGuard] },
  { path: 'departments', component: DepartmentsComponent, canActivate: [RoleGuard] },
  { path: 'designations', component: DesignationsComponent, canActivate: [RoleGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [RoleGuard] },
  { path: 'evaluator', component: EvaluatorComponent, canActivate: [RoleGuard] },
  { path: 'users', component: UserComponent, canActivate: [RoleGuard] },
  { path: '**', component: NotFoundComponent, canActivate: [RoleGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
