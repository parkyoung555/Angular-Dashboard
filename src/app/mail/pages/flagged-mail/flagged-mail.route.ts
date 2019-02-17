import {Route} from '@angular/router';
import {FlaggedMailComponent} from './flagged-mail.component';
import {RouteNavigationData} from '../../../core/navigation/models/navigation-item.model';

const routeNavigationData = new RouteNavigationData({
  title: 'Flagged',
  icon: 'flag',
  showInNavigation: 1
});

export const flaggedMailRoute: Route = {
  path: 'flagged',
  component: FlaggedMailComponent,
  data: {
    navigation: routeNavigationData
  }
};
