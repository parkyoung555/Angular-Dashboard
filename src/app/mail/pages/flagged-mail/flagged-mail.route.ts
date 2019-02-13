import {Route} from '@angular/router';
import {FlaggedMailComponent} from './flagged-mail.component';

export const flaggedMailRoute: Route = {
  path: 'flagged',
  component: FlaggedMailComponent,
  data: {
    title: 'Flagged',
    icon: 'flag',
    includeInSideNavigation: 2
  }
};
