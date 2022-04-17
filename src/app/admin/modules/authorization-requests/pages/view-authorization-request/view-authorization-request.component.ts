import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/shared/services/admin.service';

@Component({
  selector: 'app-view-authorization-request',
  templateUrl: './view-authorization-request.component.html',
  styleUrls: ['./view-authorization-request.component.scss']
})
export class ViewAuthorizationRequestComponent implements OnInit {
  @Input() tutors;
  @Input() authorizationRequest;
  @Output() closeDialog = new EventEmitter<any>();

  reviewing;

  form = this.fb.group({
    comment: [''],
    tutorId: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  isInvalid() {
    return this.form.invalid;
  }

  hasError(control, validator = 'required', form = this.form) {
    return (
      form.get(control).hasError(validator) &&
      form.get(control).touched
    );
  }

  approveAuthorizationRequest(requestId) {
    this.reviewing = true;
    const { tutorId, comment } = this.form.value;
    this.adminService.approveAuthorizationRequest(requestId, {
      tutorId,
      ...(comment && { comment })
    })
      .subscribe(
        (value) => {
          this.toastr.success('', value.message);
          this.reviewing = false;
          this.closeDialog.emit();
        }, 
        (error) => {
          this.reviewing = false;
        }
      );
  }

  rejectAuthorizationRequest(requestId) {
    this.reviewing = true;
    const { comment } = this.form.value;
    this.adminService.rejectAuthorizationRequest(requestId, {
      ...(comment && { comment })
    })
      .subscribe(
        (value) => {
          this.toastr.success('', value.message);
          this.reviewing = false;
          this.closeDialog.emit();
        }, 
        (error) => {
          this.reviewing = false;
        }
      );
  }

}
