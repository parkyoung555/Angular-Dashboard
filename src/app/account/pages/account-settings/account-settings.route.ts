import {Route} from '@angular/router';
import {AccountSettingsComponent} from './account-settings.component';
import {RouteNavigationData} from '../../../core/navigation/models/navigation-item.model';

const routeNavigationData = new RouteNavigationData({
  title: 'Security',
  icon: 'lock',
  showInNavigation: 3,
  showInUserMenu: 1
});

export const accountSettingsRoute: Route = {
  path: 'account',
  component: AccountSettingsComponent,
  data: {
    navigation: routeNavigationData
  }
};
