import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedModule as GlobalSharedModule } from '../../shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent],
  imports: [
    CommonModule,
    GlobalSharedModule,
    RouterModule,
    RatingModule,
    DialogModule,
    CalendarModule,
    FormsModule,
  ],
  exports: [
    RatingModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    GlobalSharedModule,
  ]
})
export class SharedModule { }
