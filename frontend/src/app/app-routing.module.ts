import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/common/auth.guard';
import { RoleGuardGuard } from './components/common/role-guard.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { EvaluatorComponent } from './components/evaluator/evaluator.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SigninComponent } from './components/signin/signin.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UserComponent } from './components/users/user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin', 'employee', 'evaluator']
    }
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin', 'employee', 'evaluator']
    }
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'evaluation',
    component: EvaluationComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin', 'evaluator']
    }
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: 'designations',
    component: DesignationsComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: 'evaluator',
    component: EvaluatorComponent,
    canActivate: [AuthGuard,
      RoleGuardGuard], data: {
        expectedRoles: ['admin']
      }
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
