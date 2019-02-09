import {Route} from '@angular/router';
import {AppearanceSettingsComponent} from './appearance-settings.component';

export const APPEARANCE_SETTINGS_ROUTES: Route = {
  path: 'appearance',
  component: AppearanceSettingsComponent,
  data: {
    title: 'Appearance',
    icon: 'visibility',
    includeInSideNavigation: 1,
    includeInUserMenu: 2
  }
};
