import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  viewStudent = false;
  viewPlacement = false;

  constructor() { }

  ngOnInit(): void {
  }

  openPlacementDialog() {
    this.viewPlacement = true;
  }

  openStudentDialog() {
    this.viewStudent = true;
  }

}
