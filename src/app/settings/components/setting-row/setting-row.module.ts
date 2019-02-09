import {NgModule} from '@angular/core';
import {SettingRowComponent} from './setting-row.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    FlexLayoutModule
  ],
  declarations: [
    SettingRowComponent
  ],
  exports: [
    SettingRowComponent
  ]
})
export class SettingRowModule { }
