import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
    
  }
}
