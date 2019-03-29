import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from './pages/tasks.component';
import {NgModule} from '@angular/core';
import {RouteNavigationData} from '../core/navigation/models/navigation-item.model';
import {taskListRoute} from './pages/task-list/task-list.route';
import {taskBoardRoute} from './pages/task-board/task-board.route';

const routeNavigationData = new RouteNavigationData({
  title: 'Tasks',
  icon: 'assignment_turned_in',
  showInNavigation: 4
});

const route: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    data: {
      navigation: routeNavigationData
    },
    children: [
      taskListRoute,
      taskBoardRoute,

      { path: '**', redirectTo: taskListRoute.path, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(route)
  ],
  exports: [
    RouterModule
  ]
})
export class TasksRoutingModule {}
