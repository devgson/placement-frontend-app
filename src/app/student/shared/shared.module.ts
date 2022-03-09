import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedModule as GlobalSharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [LayoutComponent, SidebarComponent],
  imports: [
    CommonModule,
    GlobalSharedModule,
    RouterModule
  ],
  exports: []
})
export class SharedModule { }
