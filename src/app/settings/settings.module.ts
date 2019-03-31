import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './pages/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatExpansionModule, MatIconModule, MatListModule} from '@angular/material';
import {PageTitleModule} from '../core/title/components/page-title/page-title.module';
import { SettingsHomeComponent } from './pages/settings-home/settings-home.component';
import {InlineNavigationModule} from '../core/navigation/components/inline-navigation/inline-navigation.module';
import {TopNavigationModule} from '../core/navigation/components/top-navigation/top-navigation.module';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsHomeComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    InlineNavigationModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    PageTitleModule,
    SettingsRoutingModule,
    TopNavigationModule
  ]
})
export class SettingsModule { }
