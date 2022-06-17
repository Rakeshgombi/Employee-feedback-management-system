import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { employeesService } from '../services/employees.service';
import { GetAllEntitiesService } from '../services/getallentities.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasklist;
  employeeName
  constructor(private getAllEntitiesservice: GetAllEntitiesService, private employeesService: employeesService) { }

  ngOnInit(): void {
    this.getAllEntitiesservice.getTasklist()
      .subscribe({
        next: (v) => {
          this.tasklist = v;
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })
  }


  // getEmployeeNameById(id: number) {
  //   this.employeesService.getEmployeeNameById(id)
  //     .subscribe({
  //       next: (v) => {
  //         console.log(v);
  //         this.employeeName = v["first_name"] + " " + v["last_name"];
  //         return this.employeeName;
  //       },
  //       error: (e: AppError) => {
  //         if (e instanceof NotFoundError) {
  //           alert("Not found");
  //         } else throw e;
  //       },
  //       complete: () => console.log('Complete')
  //     })
  // }

  trackByFn(index, task) {
    return task ? task.id : undefined;
  }

}


