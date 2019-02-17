import {Route} from '@angular/router';
import {RouteNavigationData} from '../../../core/navigation/models/navigation-item.model';
import {TaskListComponent} from './task-list.component';

const routeNavigationData = new RouteNavigationData({
  title: 'All tasks & issues',
  icon: 'assignment',
  showInNavigation: 1
});

export const taskListRoute: Route = {
  path: 'list',
  component: TaskListComponent,
  data: {
    navigation: routeNavigationData
  }
};
