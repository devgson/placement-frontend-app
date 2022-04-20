import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { intervalToDuration, getYear, format } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { SuccessResponse } from 'src/app/shared/services/auth.service';
import { TutorService } from 'src/app/tutor/shared/services/tutor.service';

@Component({
  selector: 'app-view-placement',
  templateUrl: './view-placement.component.html',
  styleUrls: ['./view-placement.component.scss']
})
export class ViewPlacementComponent implements OnInit {
  @Input() placement;
  @Output() closeDialog = new EventEmitter<any>();

  update;
  loading;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private tutorService: TutorService,
  ) { }

  form = this.fb.group({
    scheduledVisitDate: ['', Validators.required],
    scheduledVisitType: ['virtual', Validators.required],
  })

  ngOnInit(): void { }

  hasError(control, validator = 'required', form = this.form) {
    return (
      form.get(control).hasError(validator) &&
      form.get(control).touched
    );
  }

  isInvalid() {
    return this.form.invalid;
  }

  getPlacementDuration(start, end) {
    if (!start || !end) return;
    return intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    }).months;
  }

  parseToDate(date) {
    return new Date(date);
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

  setScheduledVisitStatus(scheduledVisitStatus = 'done') {
    this.tutorService.setScheduledVisitStatus(
      this.placement.id,
      { scheduledVisitStatus }
    )
      .subscribe(
        (value: SuccessResponse) => {
          this.toastr.success('', value.message);
          this.loading = false;
          this.update = false;
          this.form.reset();
          this.closeDialog.emit();
        },
        (error) => (this.loading = false)
      );
  }

  submit() {
    this.loading = true;
    const formValue = this.form.value;
    formValue.scheduledVisitDate = formValue.scheduledVisitDate.toISOString();
    this.tutorService.schedulePlacementVisit(this.placement.id, formValue)
      .subscribe(
        (value: SuccessResponse) => {
          this.toastr.success('', value.message);
          this.loading = false;
          this.update = false;
          this.form.reset();
          this.closeDialog.emit();
        },
        (error) => (this.loading = false)
      );
  }

}
