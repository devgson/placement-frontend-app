import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationRequestsComponent } from './authorization-requests.component';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ViewAuthorizationRequestComponent } from './pages/view-authorization-request/view-authorization-request.component';

const routes: Routes = [{ path: '', component: AuthorizationRequestsComponent }];
@NgModule({
  declarations: [
    AuthorizationRequestsComponent,
    ViewAuthorizationRequestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthorizationRequestsModule { }
