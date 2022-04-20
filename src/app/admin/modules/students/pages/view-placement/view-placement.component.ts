import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { format, getYear, intervalToDuration } from 'date-fns';

@Component({
  selector: 'app-view-placement',
  templateUrl: './view-placement.component.html',
  styleUrls: ['./view-placement.component.scss']
})
export class ViewPlacementComponent implements OnInit {
  @Input() placement;

  constructor() { }

  ngOnInit(): void {
  }

  getPlacementDuration(start, end) {
    if (!start || !end) return;
    return intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    }).months;
  }

  getCurrentReportDate(date = new Date()) {
    const { month, year } = this.getYearAndMonth(new Date(date));
    return `${month}, ${year}`;
  }

  getYearAndMonth(date: Date) {
    return {
      year: getYear(new Date(date)),
      month: format(new Date(date), 'LLLL'),
    }
  }

}
