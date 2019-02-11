import {NgModule} from '@angular/core';
import {EmptyMessageComponent} from './empty-message.component';
import {MatIconModule} from '@angular/material';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [
    EmptyMessageComponent
  ],
  exports: [
    EmptyMessageComponent
  ]
})
export class EmptyMessageModule {}
