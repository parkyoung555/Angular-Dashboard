import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AccountModule} from './account/account.module';
import {MailModule} from './mail/mail.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AccountModule,
    BrowserModule,
    CoreModule,
    FlexLayoutModule,
    DashboardModule,
    MatSidenavModule,
    MailModule,
    SettingsModule,

    AppRoutingModule // Must be last since it contains "Catch All" route
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
