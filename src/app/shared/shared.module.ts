import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { ViewTutorComponent } from './components/view-tutor/view-tutor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [TopbarComponent, ViewStudentComponent, ViewTutorComponent, SpinnerComponent],
  exports: [
    AgmCoreModule,
    FormsModule,
    ToastrModule,
    GooglePlaceModule,
    HttpClientModule,
    ReactiveFormsModule,

    TopbarComponent,
    SpinnerComponent,
    ViewTutorComponent,
    ViewStudentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDtMqmHaYo5UtcPDLESwr42YU-OCDUh3gc',
      libraries: ['places'],
    }),
  ]
})
export class SharedModule { }
