import {Route} from '@angular/router';
import {TaskListComponent} from './task-list.component';
import {TaskDetailsComponent} from '../../components/task-details/task-details.component';

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
      component: TaskDetailsComponent
    }
  ]
};
