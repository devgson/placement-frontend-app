import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule as GlobalSharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LayoutComponent],
  imports: [HttpClientModule, CommonModule, GlobalSharedModule, RouterModule],
  exports: [GlobalSharedModule]
})
export class SharedModule { }
