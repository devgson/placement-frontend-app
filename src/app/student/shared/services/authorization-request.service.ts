import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SuccessResponse } from 'src/app/shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationRequestService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  getAuthorizationRequests({
    id = '',
    status = '',
  } = {}): Observable<SuccessResponse> {
    const queryParams = new HttpParams({
      fromObject: {
        ...(id && { id }),
        ...(status && { status }),
      },
    });
    const url = `${environment.API_URL}/students/authorization-requests?${queryParams.toString()}`;
    return this.http
      .get(url)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  createAuthorizationRequest(data): Observable<SuccessResponse> {
    const url = `${environment.API_URL}/students/authorization-requests`;
    return this.http
      .post(url, data)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  deleteAuthorizationRequest(id): Observable<SuccessResponse> {
    const url = `${environment.API_URL}/students/authorization-requests/${id}`;
    return this.http
      .delete(url)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

}
