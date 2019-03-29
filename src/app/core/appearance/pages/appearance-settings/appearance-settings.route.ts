import {Route} from '@angular/router';
import {AppearanceSettingsComponent} from './appearance-settings.component';

export const appearanceSettingsRoute: Route = {
  path: 'appearance',
  component: AppearanceSettingsComponent,
  data: {
    navigation: {
      title: 'Appearance',
      icon: 'visibility',
      showInNavigation: 2,
      showInUserMenu: 1
    }
  }
};
