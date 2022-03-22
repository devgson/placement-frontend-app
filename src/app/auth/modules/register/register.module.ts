import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,
    CommonModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterModule { }
