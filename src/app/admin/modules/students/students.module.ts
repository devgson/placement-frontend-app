import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ViewPlacementComponent } from './pages/view-placement/view-placement.component';

const routes: Routes = [{ path: '', component: StudentsComponent }];
@NgModule({
  declarations: [
    StudentsComponent,
    ViewPlacementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentsModule { }
