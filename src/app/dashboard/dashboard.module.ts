import { NgModule } from '@angular/core';

import { DashboardComponent } from './pages/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {PageTitleModule} from '../core/title/components/page-title/page-title.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    PageTitleModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
