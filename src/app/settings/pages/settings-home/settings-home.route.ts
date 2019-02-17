import {Route} from '@angular/router';
import {RouteNavigationData} from '../../../core/navigation/models/navigation-item.model';
import {SettingsHomeComponent} from './settings-home.component';

const routeNavigationData = new RouteNavigationData({
  title: 'Home',
  icon: 'account_circle',
  showInNavigation: -1,
  showInUserMenu: -1,
  userMenuTitle: 'Account settings'
});

export const settingsHomeRoute: Route = {
  path: 'home',
  component: SettingsHomeComponent,
  data: {
    navigation: routeNavigationData
  }
};
