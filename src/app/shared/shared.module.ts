import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';



@NgModule({
  declarations: [TopbarComponent],
  exports: [TopbarComponent],
  imports: [CommonModule]
})
export class SharedModule { }
