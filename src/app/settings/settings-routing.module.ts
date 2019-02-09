import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './pages/settings.component';
import { ACCOUNT_SETTINGS_ROUTES } from '../account/pages/account-settings/account-settings.route';
import { APPEARANCE_SETTINGS_ROUTES } from '../core/appearance/pages/appearance-settings/appearance-settings.route';

const routes: Routes = [
  {
    component: SettingsComponent,
    path: 'settings',
    data: {
      title: 'Settings',
      icon: 'settings',
      includeInHeader: 2,
      includeInSideNavigation: 1,
      theme: ''
    },
    children: [
      ACCOUNT_SETTINGS_ROUTES,
      APPEARANCE_SETTINGS_ROUTES
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
