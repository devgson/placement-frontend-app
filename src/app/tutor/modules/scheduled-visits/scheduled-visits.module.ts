import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { ScheduledVisitsComponent } from './scheduled-visits.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

const routes: Routes = [{ path: '', component: ScheduledVisitsComponent }];

@NgModule({
  declarations: [ScheduledVisitsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FullCalendarModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    FullCalendarModule
  ]
})
export class ScheduledVisitsModule { }
