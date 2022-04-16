import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationRequestService } from 'src/app/student/shared/services/authorization-request.service';

@Component({
  selector: 'app-view-authorization-request',
  templateUrl: './view-authorization-request.component.html',
  styleUrls: ['./view-authorization-request.component.scss']
})
export class ViewAuthorizationRequestComponent implements OnInit {
  deleting;
  @Input() authorizationRequest;
  @Output() closeDialog = new EventEmitter<any>();

  constructor(
    private toastr: ToastrService,
    private authorizationRequestService: AuthorizationRequestService
  ) { }

  ngOnInit(): void {}

  deleteAuthorizationRequest(requestId) {
    this.deleting = true;
    this.authorizationRequestService.deleteAuthorizationRequest(requestId)
      .subscribe(
        (value) => {
          this.toastr.success('', value.message);
          this.deleting = false;
          this.closeDialog.emit();
        }, 
        (error) => {
          this.deleting = false;
        }
      );
  }

}
