import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() setDocTitle = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  setHeading(pageTitle: String) {    
    this.setDocTitle.emit(pageTitle);
  }
}
