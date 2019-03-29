import {Route} from '@angular/router';
import {InboxMailComponent} from './inbox-mail.component';

export const inboxMailRoute: Route = {
  path: 'inbox',
  component: InboxMailComponent,
  data: {
    navigation: {
      title: 'Inbox',
      icon: 'inbox',
      showInNavigation: 1
    }
  }
};
