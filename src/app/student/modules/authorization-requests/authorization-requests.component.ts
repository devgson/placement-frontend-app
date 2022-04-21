import { Component, OnInit } from '@angular/core';
import { intervalToDuration } from 'date-fns';
import { StudentService } from '../../shared/services/student.service';

@Component({
  selector: 'app-authorization-requests',
  templateUrl: './authorization-requests.component.html',
  styleUrls: ['./authorization-requests.component.scss']
})
export class AuthorizationRequestsComponent implements OnInit {
  active = 'pending';

  authorizationRequest;
  authorizationRequests = [];

  filteredAuthorizationRequests;

  numberOfPendingRequests;
  numberOfAcceptedRequests;
  numberOfRejectedRequests;

  viewAuthorizationRequest = false;
  createAuthorizationRequest = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAuthorizationRequests()
  }

  getPlacementDuration(start, end) {
    if (!start || !end) return;
    return intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    }).months;
  }

  getAuthorizationRequests() {
    this.studentService.getAuthorizationRequests()
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

  openCreateDialog() {
    this.createAuthorizationRequest = true;
  }

  postCreatingAuthorizationRequest() {
    this.createAuthorizationRequest = false;
    this.getAuthorizationRequests()
  }

  postDeletingAuthorizationRequest() {
    this.viewAuthorizationRequest = false;
    this.getAuthorizationRequests()
  }
}
