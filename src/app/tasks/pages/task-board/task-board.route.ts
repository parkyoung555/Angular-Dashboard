import {Route} from '@angular/router';
import {TaskBoardComponent} from './task-board.component';

export const taskBoardRoute: Route = {
  path: 'board',
  component: TaskBoardComponent,
  data: {
    navigation: {
      title: 'Board',
      icon: 'view_week',
      showInNavigation: 2
    }
  }
};
