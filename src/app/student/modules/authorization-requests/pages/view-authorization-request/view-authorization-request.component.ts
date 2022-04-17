import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/student/shared/services/student.service';

@Component({
  selector: 'app-view-authorization-request',
  templateUrl: './view-authorization-request.component.html',
  styleUrls: ['./view-authorization-request.component.scss']
})
export class ViewAuthorizationRequestComponent implements OnInit {
  @Input() authorizationRequest;
  @Output() closeDialog = new EventEmitter<any>();

  deleting;

  constructor(
    private toastr: ToastrService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {}

  deleteAuthorizationRequest(requestId) {
    this.deleting = true;
    this.studentService.deleteAuthorizationRequest(requestId)
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
