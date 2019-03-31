import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation.component';
import {MatTabsModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [TopNavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule
  ],
  exports: [
    TopNavigationComponent
  ]
})
export class TopNavigationModule { }
