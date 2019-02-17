import {Route} from '@angular/router';
import {TrashMailComponent} from './trash-mail.component';
import {RouteNavigationData} from '../../../core/navigation/models/navigation-item.model';

const routeNavigationData = new RouteNavigationData({
  title: 'Trash',
  icon: 'delete',
  showInNavigation: 1
});

export const trashMailRoute: Route = {
  path: 'trash',
  component: TrashMailComponent,
  data: {
    navigation: routeNavigationData
  }
};
