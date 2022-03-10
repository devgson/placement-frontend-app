import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacementsComponent } from './placements.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewPlacementComponent } from './pages/view-placement/view-placement.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: PlacementsComponent }];

@NgModule({
  declarations: [PlacementsComponent, ViewPlacementComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class PlacementsModule { }
