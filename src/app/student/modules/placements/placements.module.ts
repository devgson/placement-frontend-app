import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacementsComponent } from './placements.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: PlacementsComponent }];

@NgModule({
  declarations: [PlacementsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PlacementsModule { }
