import {Route} from '@angular/router';
import {FlaggedMailComponent} from './flagged-mail.component';

export const flaggedMailRoute: Route = {
  path: 'flagged',
  component: FlaggedMailComponent,
  data: {
    navigation: {
      title: 'Flagged',
      icon: 'flag',
      showInNavigation: 2
    }
  }
};
