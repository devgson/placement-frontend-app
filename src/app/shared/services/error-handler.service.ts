import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(error) {}

  handleHttpError(error: HttpErrorResponse) {
    const response: ErrorDetails = error.error;

    let errorTitle = 'An error occured';
    const errorMessage = response.message || 'Please try again later';

    if (typeof response.error === 'string') errorTitle = response.error;
    if (response.statusCode === 500) errorTitle = 'Internal Server Error occured';

    this._toastr.error(errorMessage, errorTitle);
    return throwError(error);
  }

  private get _toastr() {
    return this.injector.get(ToastrService);
  }
}

export interface ErrorDetails {
  error: any;
  message: string;
  statusCode: number;
}