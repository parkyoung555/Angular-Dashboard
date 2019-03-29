import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard.component';
import {RouteNavigationData} from '../core/navigation/models/navigation-item.model';

const routeNavigationData = new RouteNavigationData({
  title: 'Dashboard',
  icon: 'dashboard',
  showInNavigation: 1
});

const routes: Routes = [
  {
    component: DashboardComponent,
    path: 'dashboard',
    data: {
      navigation: routeNavigationData
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
