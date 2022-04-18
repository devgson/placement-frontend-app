import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  @Input() student;

  constructor() { }

  ngOnInit(): void {
  }

}
