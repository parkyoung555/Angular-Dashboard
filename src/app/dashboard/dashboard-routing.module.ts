import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard.component';

const routes: Routes = [
  {
    component: DashboardComponent,
    path: 'dashboard',
    data: {
      title: 'Dashboard',
      icon: 'dashboard',
      includeInSideNavigation: 1,
      // includeInHeader: 2,
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
