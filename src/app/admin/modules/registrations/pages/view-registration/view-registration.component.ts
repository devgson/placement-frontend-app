import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/shared/services/admin.service';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.scss']
})
export class ViewRegistrationComponent implements OnInit {
  @Input() registration;
  @Output() closeDialog = new EventEmitter<any>();

  reviewing;

  constructor(
    private toastr: ToastrService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {}

  currentRole() {
    return this.registration.position ? 'tutor' : 'student'; 
  }

  approveRegistration(registrationId) {
    this.reviewing = true;
    this.adminService.approveRegistration(registrationId, this.currentRole())
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

  rejectRegistration(registrationId) {
    this.reviewing = true;
    this.adminService.rejectRegistration(registrationId, this.currentRole())
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
