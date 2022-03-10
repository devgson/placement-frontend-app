import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/tutor/placements', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'map',
        loadChildren: () => import('./modules/map/map.module').then((m) => m.MapModule),
      },
      {
        path: 'placements',
        loadChildren: () => import('./modules/placements/placements.module').then((m) => m.PlacementsModule),
      },
      {
        path: 'scheduled-visits',
        loadChildren: () => import('./modules/scheduled-visits/scheduled-visits.module').then((m) => m.ScheduledVisitsModule),
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TutorModule { }
