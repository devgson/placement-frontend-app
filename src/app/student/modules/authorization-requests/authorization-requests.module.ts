import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationRequestsComponent } from './authorization-requests.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewAuthorizationRequestComponent } from './pages/view-authorization-request/view-authorization-request.component';
import { CreateAuthorizationRequestComponent } from './pages/create-authorization-request/create-authorization-request.component';
import { SharedModule } from '../../shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';

const routes: Routes = [{ path: '', component: AuthorizationRequestsComponent }];
@NgModule({
  declarations: [AuthorizationRequestsComponent, ViewAuthorizationRequestComponent, CreateAuthorizationRequestComponent],
  imports: [
    CommonModule,
    SharedModule,
    FileUploadModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthorizationRequestsModule { }
