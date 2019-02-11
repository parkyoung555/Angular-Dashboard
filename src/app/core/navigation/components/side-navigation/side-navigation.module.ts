import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationComponent } from './side-navigation.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {DynamicLogoIconModule} from '../../../logo/components/dynamic-logo-icon/dynamic-logo-icon.module';
import {FormsModule} from '@angular/forms';
import {EmptyMessageModule} from '../../../empty-message/components/empty-message/empty-message.module';

@NgModule({
  declarations: [SideNavigationComponent],
  imports: [
    CommonModule,
    DragDropModule,
    DynamicLogoIconModule,
    EmptyMessageModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule
  ],
  exports: [
    SideNavigationComponent
  ]
})
export class SideNavigationModule { }
