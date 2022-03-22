import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

export interface SuccessResponse {
  data: any;
  message: string;
  statusCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  register(type, data): Observable<SuccessResponse> {
    const url = `http://localhost:3000/auth/register/${type}`;
    return this.http
      .post(url, data)
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  login(role, data): Observable<SuccessResponse> {
    const url = `http://localhost:3000/auth/login/${role}`;
    return this.http
      .post(url, data)
      .pipe(
        map((response: SuccessResponse) => this.handleLogin(response)),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  adminLogin(data): Observable<SuccessResponse> {
    return this.http
      .post(`http://localhost:3000/auth/login/admin`, data)
      .pipe(
        map((response: SuccessResponse) => this.handleLogin(response)),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  handleLogin(response: SuccessResponse) {
    this.storeToken(response.data);
    this.storeDecodedToken(this.decodeToken(response.data));
    return response;
  }

  storeDecodedToken(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  storeToken(token) {
    localStorage.setItem('userToken', token);
  }

  decodeToken(token) {
    return jwt_decode(token);
  }
}
