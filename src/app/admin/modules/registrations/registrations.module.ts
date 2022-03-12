import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationsComponent } from './registrations.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ViewRegistrationComponent } from './pages/view-registration/view-registration.component';

const routes: Routes = [{ path: '', component: RegistrationsComponent }];

@NgModule({
  declarations: [
    RegistrationsComponent,
    ViewRegistrationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class RegistrationsModule { }
