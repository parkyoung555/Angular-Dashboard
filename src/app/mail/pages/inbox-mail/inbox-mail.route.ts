import {Route} from '@angular/router';
import {InboxMailComponent} from './inbox-mail.component';

export const inboxMailRoute: Route = {
  path: 'inbox',
  component: InboxMailComponent,
  data: {
    title: 'Inbox',
    icon: 'inbox',
    includeInSideNavigation: 1
  }
};
