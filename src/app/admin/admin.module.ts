import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/registrations', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'registrations',
        loadChildren: () => import('./modules/registrations/registrations.module').then((m) => m.RegistrationsModule),
      },
      {
        path: 'authorization-requests',
        loadChildren: () => import('./modules/authorization-requests/authorization-requests.module').then((m) => m.AuthorizationRequestsModule),
      },
      {
        path: 'students',
        loadChildren: () => import('./modules/students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'tutors',
        loadChildren: () => import('./modules/tutors/tutors.module').then((m) => m.TutorsModule),
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
export class AdminModule { }
