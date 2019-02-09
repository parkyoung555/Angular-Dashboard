import {Route} from '@angular/router';
import {AccountSettingsComponent} from './account-settings.component';

export const ACCOUNT_SETTINGS_ROUTES: Route = {
  path: 'account',
  component: AccountSettingsComponent,
  data: {
    title: 'Personal info',
    icon: 'person',
    includeInSideNavigation: 1,
    includeInUserMenu: 1
  }
};


// @NgModule({
//   imports: [
//     RouterModule.forChild(routes)
//   ],
//   exports: [
//     RouterModule
//   ]
// })
// export class AccountRouteModule { }
