import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.scss']
})
export class TutorsComponent implements OnInit {

  viewTutor = false;

  constructor() {}

  ngOnInit(): void {}

  openDialog() {
    this.viewTutor = true;
  }

}
