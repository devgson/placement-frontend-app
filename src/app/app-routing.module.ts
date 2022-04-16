import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'student',
    canActivate: [LoggedInGuard, RoleGuard],
    data: { role: 'student' },
    loadChildren: () => import('./student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'tutor',
    canActivate: [LoggedInGuard, RoleGuard],
    data: { role: 'tutor' },
    loadChildren: () => import('./tutor/tutor.module').then((m) => m.TutorModule),
  },
  {
    path: 'admin',
    canActivate: [LoggedInGuard, RoleGuard],
    data: { role: 'admin' },
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
