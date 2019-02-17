import {Route} from '@angular/router';
import {RouteNavigationData} from '../../../core/navigation/models/navigation-item.model';
import {TaskBoardComponent} from './task-board.component';

const routeNavigationData = new RouteNavigationData({
  title: 'Board',
  icon: 'view_week',
  showInNavigation: 2
});

export const taskBoardRoute: Route = {
  path: 'board',
  component: TaskBoardComponent,
  data: {
    navigation: routeNavigationData
  }
};
