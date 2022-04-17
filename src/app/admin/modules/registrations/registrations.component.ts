import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {

  active = 'pending';

  registration;
  registrations = [];

  filteredRegistrations;

  numberOfPendingRegistrations;
  numberOfAcceptedRegistrations;
  numberOfRejectedRegistrations;

  viewRegistration = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getRegistrations();
  }

  getRegistrations() {
    this.adminService.getRegistrations()
      .subscribe((value) => {
        this.registrations = value.data;
        this.setActive('pending');
        this.setNumberOfRequests();
      })
  }

  setNumberOfRequests() {
    this.numberOfPendingRegistrations = this.filterByStatus('pending').length;
    this.numberOfAcceptedRegistrations = this.filterByStatus('approved').length;
    this.numberOfRejectedRegistrations = this.filterByStatus('rejected').length;
  }

  setActive(status) {
    this.filteredRegistrations = this.filterByStatus(status);
    this.active = status;
  }

  filterByStatus(status) {
    return this.registrations.filter((registration) => registration.registrationStatus === status);
  }

  openViewDialog(registration) {
    this.registration = registration;
    this.viewRegistration = true;
  }

  postReviewingRegistration() {
    this.viewRegistration = false;
    this.getRegistrations()
  }


}
