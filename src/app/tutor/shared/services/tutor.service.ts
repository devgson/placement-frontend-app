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
export class TutorService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getPlacements({
    id = '',
    status = '',
    scheduledVisit = false,
  } = {}): Observable<SuccessResponse> {
    const queryParams = new HttpParams({
      fromObject: {
        ...(id && { id }),
        ...(status && { status }),
        ...(scheduledVisit && { scheduledVisit }),
      },
    });
    const url = `${environment.API_URL}/tutors/placements?${queryParams.toString()}`;
    return this.http
      .get(url)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  setScheduledVisitStatus(id, data): Observable<SuccessResponse> {
    const url = `${environment.API_URL}/tutors/placements/${id}/visit/status`;
    return this.http
      .put(url, data)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  schedulePlacementVisit(id, data): Observable<SuccessResponse> {
    const url = `${environment.API_URL}/tutors/placements/${id}/visit`;
    return this.http
      .put(url, data)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

}
