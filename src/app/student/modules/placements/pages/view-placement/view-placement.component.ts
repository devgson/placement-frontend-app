import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { addMonths, format, getYear, intervalToDuration, isAfter, isBefore } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { SuccessResponse } from 'src/app/shared/services/auth.service';
import { StudentService } from 'src/app/student/shared/services/student.service';

@Component({
  selector: 'app-view-placement',
  templateUrl: './view-placement.component.html',
  styleUrls: ['./view-placement.component.scss']
})
export class ViewPlacementComponent implements OnInit {
  @Input() placement;
  @Output() closeDialog = new EventEmitter<any>();

  submitting;

  form = this.fb.group({
    month: ['', Validators.required],
    report: ['', Validators.required],
    rating: [1, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
  }

  getPlacementDuration(start, end) {
    if (!start || !end) return;
    return intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    }).months;
  }

  allowToUploadReport() {
    if (!this.placement) return false;
    
    const placementHasNotStarted = isBefore(new Date(), new Date(this.placement.startDate));
    if (placementHasNotStarted) return false;

    const endDate = addMonths(new Date(this.placement.endDate), 1);
    const placementHasFinished = isAfter(new Date(), endDate);
    if (placementHasFinished) return false;

    const { month, year } = this.getYearAndMonth(new Date());
    const reportHasBeenSubmitted = this.reportHasBeenSubmitted(year, month);
    if (reportHasBeenSubmitted) return false;

    this.setCurrentReportDate();
    return true;
  }

  reportHasBeenSubmitted(year, month) {
    return this.placement.monthlyReports
      .filter((report) => {
        const submissionDate = this.getYearAndMonth(report.month);
        return (submissionDate.month === month && submissionDate.year === year);
      })
      .length;
  }

  setCurrentReportDate() {
    this.form.patchValue({ month: new Date().toISOString() });
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

  getControlValue(control, form = this.form) {
    return form.get(control).value;
  }

  hasError(control, validator = 'required', form = this.form) {
    return (
      form.get(control).hasError(validator) &&
      form.get(control).touched
    );
  }

  isInvalid() {
    return this.form.invalid;
  }

  uploadFile(file) {
    const singleFile: File = file.files[0];
    this.form.patchValue({ report: singleFile });
  }

  removeFile() {
    this.form.patchValue({ report: '' });
  }

  submit() {
    this.submitting = true;
    const formValue = this.form.value;
    let formData: any = new FormData();
    Object.keys(formValue).forEach(key => {
      formData.append(key,  formValue[key]);
    });
    this.studentService.submitMonthlyReport(this.placement.id, formData)
      .subscribe(
        (value: SuccessResponse) => {
          this.toastr.success('', value.message);
          this.submitting = false;
          this.form.reset();
          this.closeDialog.emit();
        },
        (error) => (this.submitting = false)
      );
  }
}

/*

[(ngModel)]="rating" [stars]="5" 

Start Date - 17th April 2022
End Date - 17th June 2022

If current date is greater than end date + 1 month - Don't Show Upload Report Text
else If report for current month + year has already been submitted - Don't Show Upload Report Text
else {
  Set current month, year and Show Upload Report Text
}

*/