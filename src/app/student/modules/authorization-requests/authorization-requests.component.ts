import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorization-requests',
  templateUrl: './authorization-requests.component.html',
  styleUrls: ['./authorization-requests.component.scss']
})
export class AuthorizationRequestsComponent implements OnInit {

  viewAuthorizationRequest = false;

  constructor() { }

  ngOnInit(): void {
  }

}
