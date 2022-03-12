import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorsComponent } from './tutors.component';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: TutorsComponent }];

@NgModule({
  declarations: [
    TutorsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class TutorsModule { }
