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
export class AdminService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getTutors({
    id = '',
    registrationStatus = '',
  } = {}): Observable<SuccessResponse> {
    const queryParams = new HttpParams({
      fromObject: {
        ...(id && { id }),
        ...(registrationStatus && { registrationStatus }),
      },
    });
    const url = `${environment.API_URL}/admin/tutors?${queryParams.toString()}`;
    return this.http
      .get(url)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  getPlacements({
    id = '',
    status = '',
  } = {}): Observable<SuccessResponse> {
    const queryParams = new HttpParams({
      fromObject: {
        ...(id && { id }),
        ...(status && { status }),
      },
    });
    const url = `${environment.API_URL}/admin/placements?${queryParams.toString()}`;
    return this.http
      .get(url)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  getRegistrations({
    id = '',
    type = '',
    registrationStatus = '',
  } = {}): Observable<SuccessResponse> {
    const queryParams = new HttpParams({
      fromObject: {
        ...(id && { id }),
        ...(type && { type }),
        ...(registrationStatus && { registrationStatus }),
      },
    });
    const url = `${environment.API_URL}/admin/registrations?${queryParams.toString()}`;
    return this.http
      .get(url)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

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
    const url = `${environment.API_URL}/admin/authorization-requests?${queryParams.toString()}`;
    return this.http
      .get(url)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  approveRegistration(id, role): Observable<SuccessResponse> {
    const url = `${environment.API_URL}/admin/registrations/${id}/approve`;
    return this.http
      .post(url, { type: role })
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  rejectRegistration(id, role): Observable<SuccessResponse> {
    const url = `${environment.API_URL}/admin/registrations/${id}/reject`;
    return this.http
      .post(url, { type: role })
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  approveAuthorizationRequest(id, data): Observable<SuccessResponse> {
    const url = `${environment.API_URL}/admin/authorization-requests/${id}/approve`;
    return this.http
      .post(url, data)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  rejectAuthorizationRequest(id, data): Observable<SuccessResponse> {
    const url = `${environment.API_URL}/admin/authorization-requests/${id}/reject`;
    return this.http
      .post(url, data)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }
}
