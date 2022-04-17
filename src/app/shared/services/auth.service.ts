import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface SuccessResponse {
  data: any;
  message: string;
  statusCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private errorHandler: ErrorHandlerService) {}

  register(type, data): Observable<SuccessResponse> {
    const url = `${environment.API_URL}/auth/register/${type}`;
    return this.http
      .post(url, data, { headers: { 'X-Skip-Interceptor': 'true' } })
      .pipe(
        map((response: SuccessResponse) => response),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    this.router.navigate(['/auth/login']);
  }

  login(role, data): Observable<SuccessResponse> {
    const url = `${environment.API_URL}/auth/login/${role}`;
    return this.http
      .post(url, data, { headers: { 'X-Skip-Interceptor': 'true' } })
      .pipe(
        map((response: SuccessResponse) => this.handleLogin(response)),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  adminLogin(data): Observable<SuccessResponse> {
    return this.http
      .post(
        `${environment.API_URL}/auth/login/admin`,
        data,
        { headers: { 'X-Skip-Interceptor': 'true' } })
      .pipe(
        map((response: SuccessResponse) => this.handleLogin(response)),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  userHasRole(role) {
    const user = this.getUserFromLocalStorage();
    return user?.role === role;
  }

  getTokenFromLocalStorage() {
    return localStorage.getItem('userToken');
  }

  getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user);
  }

  handleLogin(response: SuccessResponse) {
    this.storeToken(response.data);
    this.storeDecodedToken(this.decodeToken(response.data));
    return response;
  }

  isTokenExpired() {
    const token = this.getTokenFromLocalStorage();
    if (!token) return true;
    const decodedToken: any = this.decodeToken(token);
    return new Date().valueOf() > new Date(decodedToken.exp * 1000).valueOf();
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
