import { Component, OnInit } from '@angular/core';
import { intervalToDuration } from 'date-fns';
import { StudentService } from 'src/app/student/shared/services/student.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  active = 'active';

  student;
  placement;
  placements;

  filteredPlacements;

  numberOfActivePlacements;
  numberOfCompletedPlacements;

  viewStudent = false;
  viewPlacement = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getPlacements();
  }

  getPlacementDuration(start, end) {
    if (!start || !end) return;
    return intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    }).months;
  }

  getPlacements() {
    this.adminService.getPlacements()
      .subscribe((value) => {
        this.placements = value.data;
        this.setActive('active');
        this.setNumberOfPlacements();
      })
  }

  setNumberOfPlacements() {
    this.numberOfActivePlacements = this.filterByStatus('active').length;
    this.numberOfCompletedPlacements = this.filterByStatus('completed').length;
  }

  setActive(status) {
    this.filteredPlacements = this.filterByStatus(status);
    this.active = status;
  }

  filterByStatus(status) {
    return this.placements.filter((placement) => placement.status === status);
  }

  openPlacementDialog(placement) {
    this.placement = placement;
    this.viewPlacement = true;
  }

  openStudentDialog(student) {
    this.student = student;
    this.viewStudent = true;
  }

}
