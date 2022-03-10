import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacementsComponent } from './placements.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ViewPlacementComponent } from './pages/view-placement/view-placement.component';

const routes: Routes = [{ path: '', component: PlacementsComponent }];

@NgModule({
  declarations: [
    PlacementsComponent,
    ViewPlacementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class PlacementsModule { }
