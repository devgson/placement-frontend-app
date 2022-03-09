import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: '/student/placements', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'authorization-requests',
        loadChildren: () => import('./modules/authorization-requests/authorization-requests.module').then((m) => m.AuthorizationRequestsModule),
      },
      {
        path: 'placements',
        loadChildren: () => import('./modules/placements/placements.module').then((m) => m.PlacementsModule),
      },
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
export class StudentModule { }
