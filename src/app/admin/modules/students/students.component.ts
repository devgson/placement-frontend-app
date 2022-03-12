import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  viewPlacement = false;

  constructor() { }

  ngOnInit(): void {
  }

  openDialog() {
    this.viewPlacement = true;
  }

}
