import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { add, intervalToDuration } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { SuccessResponse } from 'src/app/shared/services/auth.service';
import { AuthorizationRequestService } from 'src/app/student/shared/services/authorization-request.service';

@Component({
  selector: 'app-create-authorization-request',
  templateUrl: './create-authorization-request.component.html',
  styleUrls: ['./create-authorization-request.component.scss']
})
export class CreateAuthorizationRequestComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<any>();
  minDate = new Date();
  maxDate = add(new Date(), { months: 12 });

  loading;
  form = this.fb.group(
    {
      studentComment: [''],
      location: ['', Validators.required],
      duration: [1, [Validators.required, Validators.min(1), Validators.max(12)]],
      requestForm: ['', Validators.required],
      companyName: ['', Validators.required],
      companySector: ['', Validators.required],
      potentialEndDate: ['', Validators.required],
      potentialStartDate: ['', Validators.required],
    }, 
    {
      validators: [
        this.dateValidator('potentialStartDate', 'potentialEndDate'),
        this.maxDurationValidator('potentialStartDate', 'potentialEndDate'),
      ]
    }
  );

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authorizationRequestService: AuthorizationRequestService,
  ) { }

  ngOnInit(): void {
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

  maxDurationValidator(startDateControl, endDateControl) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const startDate = formGroup.get(startDateControl)?.value;
      const endDate = formGroup.get(endDateControl)?.value;
      if (!startDate || !endDate) return null;
      const interval = intervalToDuration({
        start: new Date(startDate),
        end: new Date(endDate)
      })
      return interval.years >= 1 ? { maxDurationExceeded: true } : null;
    };
  };

  dateValidator(startDateControl, endDateControl) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const startDate = formGroup.get(startDateControl)?.value;
      const endDate = formGroup.get(endDateControl)?.value;
      if (!startDate || !endDate) return null;
      return new Date(endDate.toDateString()) < new Date(startDate.toDateString())
        ? { earlierEndDate: true }
        : null;
    };
  };

  isInvalid() {
    return this.form.invalid;
  }

  uploadFile(file) {
    const singleFile: File = file.files[0];
    this.form.patchValue({ requestForm: singleFile });
  }

  removeFile() {
    this.form.patchValue({ requestForm: '' });
  }

  submit() {
    this.loading = true;
    const formValue = this.form.value;
    let formData: any = new FormData();
    Object.keys(formValue).forEach(key => {
      if (key === 'potentialStartDate' || key === 'potentialEndDate') {
        const date: Date = formValue[key]
        formData.append(key,  date.toISOString());
        return;
      }
      formData.append(key,  formValue[key]);
    });
    this.authorizationRequestService.createAuthorizationRequest(formData)
      .subscribe(
        (value: SuccessResponse) => {
          this.toastr.success('Your request has been sent to an admin for review', value.message);
          this.loading = false;
          this.form.reset();
          this.closeDialog.emit();
        },
        (error) => (this.loading = false)
      );
  }
}
