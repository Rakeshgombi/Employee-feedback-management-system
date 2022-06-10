import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { ProductsComponent } from './components/products/products.component';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'tasks-component', component: TasksComponent },
  { path: 'evaluation-component', component: EvaluationComponent },
  { path: 'products-component', component: ProductsComponent },
  { path: 'departments-component', component: DepartmentsComponent },
  { path: 'designations-component', component: DesignationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
