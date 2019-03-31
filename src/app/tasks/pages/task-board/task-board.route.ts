import {Route} from '@angular/router';
import {TaskBoardComponent} from './task-board.component';
import {TaskDetailsDialogComponent} from '../../components/task-details-dialog/task-details-dialog.component';

export const taskBoardRoute: Route = {
  path: 'board',
  component: TaskBoardComponent,
  data: {
    navigation: {
      title: 'Board',
      icon: 'view_week',
      showInNavigation: 2
    }
  },
  children: [
    {
      path: ':taskId',
      component: TaskDetailsDialogComponent
    }
  ]
};
