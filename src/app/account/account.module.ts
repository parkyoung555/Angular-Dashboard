import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    AccountSettingsComponent
  ],
  exports: [
    AccountSettingsComponent
  ]
})
export class AccountModule { }
