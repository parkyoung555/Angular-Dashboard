import {NgModule} from '@angular/core';
import {InlineNavigationComponent} from './inline-navigation.component';
import {MatIconModule, MatListModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    InlineNavigationComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  exports: [
    InlineNavigationComponent
  ]
})
export class InlineNavigationModule {}
