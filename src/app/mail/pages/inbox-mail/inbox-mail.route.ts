import {Route} from '@angular/router';
import {InboxMailComponent} from './inbox-mail.component';
import {RouteNavigationData} from '../../../core/navigation/models/navigation-item.model';

const routeNavigationData = new RouteNavigationData({
  title: 'Inbox',
  icon: 'inbox',
  showInNavigation: 1
});

export const inboxMailRoute: Route = {
  path: 'inbox',
  component: InboxMailComponent,
  data: {
    navigation: routeNavigationData
  }
};
