import {NgModule} from '@angular/core';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import {CreateTaskFormComponent} from './create-task-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {QuillModule} from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    QuillModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateTaskFormComponent
  ],
  exports: [
    CreateTaskFormComponent
  ]
})
export class CreateTaskFormModule {}
