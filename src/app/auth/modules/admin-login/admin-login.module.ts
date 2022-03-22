import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: AdminLoginComponent }];

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminLoginModule { }
