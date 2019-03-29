import {Route} from '@angular/router';
import {AccountSettingsComponent} from './account-settings.component';

export const accountSettingsRoute: Route = {
  path: 'account',
  component: AccountSettingsComponent,
  data: {
    navigation: {
      title: 'Security',
      icon: 'lock',
      showInNavigation: 3,
      showInUserMenu: 1
    }
  }
};
