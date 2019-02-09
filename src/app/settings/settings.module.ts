import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './pages/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatExpansionModule, MatIconModule, MatListModule} from '@angular/material';
import {PageTitleModule} from '../core/title/components/page-title/page-title.module';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    PageTitleModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
