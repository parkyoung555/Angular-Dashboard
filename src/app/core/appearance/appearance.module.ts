import { NgModule } from '@angular/core';
import { AppearanceSettingsComponent } from './pages/appearance-settings/appearance-settings.component';
import {MatCardModule, MatExpansionModule, MatIconModule, MatRippleModule, MatSlideToggleModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SettingRowModule} from '../../settings/components/setting-row/setting-row.module';
import {ColorSwatchModule} from './components/color-swatch/color-swatch.module';

@NgModule({
  imports: [
    ColorSwatchModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatExpansionModule,
    SettingRowModule
  ],
  declarations: [AppearanceSettingsComponent]
})
export class AppearanceModule { }
