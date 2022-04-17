import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-authorization-requests',
  templateUrl: './authorization-requests.component.html',
  styleUrls: ['./authorization-requests.component.scss']
})
export class AuthorizationRequestsComponent implements OnInit {

  active = 'pending';

  tutors;
  authorizationRequest;
  authorizationRequests = [];

  filteredAuthorizationRequests;

  numberOfPendingRequests;
  numberOfAcceptedRequests;
  numberOfRejectedRequests;

  viewAuthorizationRequest = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getTutors({ registrationStatus: 'approved' });
    this.getAuthorizationRequests()
  }

  getTutors(query) {
    this.adminService.getTutors(query)
      .subscribe((value) => {
        this.tutors = value.data;
      })
  }

  getAuthorizationRequests() {
    this.adminService.getAuthorizationRequests()
      .subscribe((value) => {
        this.authorizationRequests = value.data;
        this.setActive('pending');
        this.setNumberOfRequests();
      })
  }

  setNumberOfRequests() {
    this.numberOfPendingRequests = this.filterByStatus('pending').length;
    this.numberOfAcceptedRequests = this.filterByStatus('approved').length;
    this.numberOfRejectedRequests = this.filterByStatus('rejected').length;
  }

  setActive(status) {
    this.filteredAuthorizationRequests = this.filterByStatus(status);
    this.active = status;
  }

  filterByStatus(status) {
    return this.authorizationRequests
      .filter((authorizationRequest) => authorizationRequest.status === status);
  }

  openViewDialog(authorizationRequest) {
    this.authorizationRequest = authorizationRequest;
    this.viewAuthorizationRequest = true;
  }

  postReviewingAuthorizationRequest() {
    this.viewAuthorizationRequest = false;
    this.getAuthorizationRequests()
  }

}
