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
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UserComponent } from './components/users/user.component';

const routes: Routes = [
  {
    path: 'signin',
    title: 'Signin - Employee Feedback Management System',
    component: SigninComponent
  },
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard - Employee Feedback Management System',
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin', 'employee', 'evaluator']
    }
  },
  {
    path: 'tasks',
    component: TasksComponent,
    title: 'Tasks - Employee Feedback Management System',
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin', 'employee', 'evaluator']
    }
  },
  {
    path: 'evaluation',
    title: 'Evaluation - Employee Feedback Management System',
    component: EvaluationComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin', 'evaluator']
    }
  },
  {
    path: 'departments',
    title: 'Departments - Employee Feedback Management System',
    component: DepartmentsComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: 'designations',
    title: 'Designation - Employee Feedback Management System',
    component: DesignationsComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: 'employees',
    title: 'Employees - Employee Feedback Management System',
    component: EmployeesComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: 'evaluator',
    title: 'Evaluator - Employee Feedback Management System',
    component: EvaluatorComponent,
    canActivate: [AuthGuard,
      RoleGuardGuard], data: {
        expectedRoles: ['admin']
      }
  },
  {
    path: 'users',
    title: 'Users - Employee Feedback Management System',
    component: UserComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: 'profile/:role/:id',
    title: 'Profile - Employee Feedback Management System',
    component: ProfileComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: {
      expectedRoles: ['admin', 'employee', 'evaluator']
    }
  },
  {
    path: '**',
    title: 'Not Found - Employee Feedback Management System',
    component: NotFoundComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
