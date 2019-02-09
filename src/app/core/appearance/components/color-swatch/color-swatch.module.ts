import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColorSwatchComponent} from './color-swatch.component';
import {MatIconModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    ColorSwatchComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    ColorSwatchComponent
  ]
})
export class ColorSwatchModule { }
