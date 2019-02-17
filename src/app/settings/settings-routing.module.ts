import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './pages/settings.component';
import { accountSettingsRoute } from '../account/pages/account-settings/account-settings.route';
import { appearanceSettingsRoute } from '../core/appearance/pages/appearance-settings/appearance-settings.route';
import {RouteNavigationData} from '../core/navigation/models/navigation-item.model';
import {settingsHomeRoute} from './pages/settings-home/settings-home.route';

const routeNavigationData = new RouteNavigationData({
  title: 'Settings',
  icon: 'settings',
  showInNavigation: 10,
  displayChildrenAs: 'INLINE'
});

const routes: Routes = [
  {
    component: SettingsComponent,
    path: 'settings',
    data: {
      navigation: routeNavigationData
    },
    children: [
      accountSettingsRoute,
      appearanceSettingsRoute,
      settingsHomeRoute,

      { path: '**', redirectTo: settingsHomeRoute.path, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
