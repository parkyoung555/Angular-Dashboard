import {Route} from '@angular/router';
import {AccountSettingsComponent} from './account-settings.component';

export const accountSettingsRoute: Route = {
  path: 'account',
  component: AccountSettingsComponent,
  data: {
    title: 'Personal info',
    icon: 'person',
    includeInSideNavigation: 1,
    includeInUserMenu: 1
  }
};

