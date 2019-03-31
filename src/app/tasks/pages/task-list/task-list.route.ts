import {Route} from '@angular/router';
import {TaskListComponent} from './task-list.component';
import {TaskDetailsDrawerComponent} from '../../components/task-details-drawer/task-details-drawer.component';

export const taskListRoute: Route = {
  path: 'list',
  component: TaskListComponent,
  data: {
    navigation: {
      title: 'All tasks & issues',
      icon: 'assignment',
      showInNavigation: 1
    }
  },
  children: [
    {
      path: ':taskId',
      component: TaskDetailsDrawerComponent
    }
  ]
};
