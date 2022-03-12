import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { ViewTutorComponent } from './components/view-tutor/view-tutor.component';

@NgModule({
  declarations: [TopbarComponent, ViewStudentComponent, ViewTutorComponent],
  exports: [TopbarComponent, ViewStudentComponent, ViewTutorComponent],
  imports: [CommonModule]
})
export class SharedModule { }
