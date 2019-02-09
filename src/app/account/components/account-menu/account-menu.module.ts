import {NgModule} from '@angular/core';
import {AccountMenuComponent} from './account-menu.component';
import {MatIconModule, MatMenuModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  declarations: [
    AccountMenuComponent
  ],
  exports: [
    AccountMenuComponent
  ]
})
export class AccountMenuModule {}
