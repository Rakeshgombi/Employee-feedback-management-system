import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
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
        error: (e) => console.log(e),
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
  //       error: (e) => console.log(e),
  //       complete: () => console.log('Complete')
  //     })
  // }

  // getEmployeeNameById(id: number): Observable<string> {
  //   return this.employeesService.getEmployeeNameById(id).pipe(
  //     map(x => x["first_name"] + " " + x["last_name"])
  //   )
  // }
  // trackByFn(index, task) {
  //   return task.id;
  // }
}


