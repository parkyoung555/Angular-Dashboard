import {Route} from '@angular/router';
import {AppearanceSettingsComponent} from './appearance-settings.component';
import {RouteNavigationData} from '../../../navigation/models/navigation-item.model';

const routeNavigationData = new RouteNavigationData({
  title: 'Appearance',
  icon: 'visibility',
  showInNavigation: 2,
  showInUserMenu: 1
});

export const appearanceSettingsRoute: Route = {
  path: 'appearance',
  component: AppearanceSettingsComponent,
  data: {
    navigation: routeNavigationData
  }
};
