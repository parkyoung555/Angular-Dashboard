import {Route} from '@angular/router';
import {SettingsHomeComponent} from './settings-home.component';

export const settingsHomeRoute: Route = {
  path: 'home',
  component: SettingsHomeComponent,
  data: {
    navigation: {
      title: 'Home',
      icon: 'account_circle',
      showInNavigation: -1,
      showInUserMenu: -1,
      userMenuTitle: 'Account settings'
    }
  }
};
