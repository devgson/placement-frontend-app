import { Component, OnInit } from '@angular/core';
import { intervalToDuration } from 'date-fns';
import { StudentService } from '../../shared/services/student.service';

@Component({
  selector: 'app-placements',
  templateUrl: './placements.component.html',
  styleUrls: ['./placements.component.scss']
})
export class PlacementsComponent implements OnInit {

  active = 'active';

  placement;
  placements;

  filteredPlacements;

  numberOfActivePlacements;
  numberOfCompletedPlacements;

  viewPlacement = false;

  constructor(private studentService: StudentService) { }

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
    this.studentService.getPlacements()
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

  openDialog(placement) {
    this.placement = placement;
    this.viewPlacement = true;
  }

  postSubmittingMonthlyReport() {
    this.viewPlacement = false;
    this.getPlacements();
  }

}
