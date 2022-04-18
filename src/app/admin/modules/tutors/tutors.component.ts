import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.scss']
})
export class TutorsComponent implements OnInit {

  tutor;
  tutors;
  viewTutor = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getTutors({});
  }

  getTutors(query) {
    this.adminService.getTutors(query)
      .subscribe((value) => {
        this.tutors = value.data;
      })
  }

  openDialog(tutor) {
    this.tutor = tutor;
    this.viewTutor = true;
  }

}
