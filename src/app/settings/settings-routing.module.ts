import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './pages/settings.component';
import { accountSettingsRoute } from '../account/pages/account-settings/account-settings.route';
import { appearanceSettingsRoute } from '../core/appearance/pages/appearance-settings/appearance-settings.route';

const routes: Routes = [
  {
    component: SettingsComponent,
    path: 'settings',
    data: {
      title: 'Settings',
      icon: 'settings',
      includeInSideNavigation: 1,
      theme: ''
    },
    children: [
      accountSettingsRoute,
      appearanceSettingsRoute
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
