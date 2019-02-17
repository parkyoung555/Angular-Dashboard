import {NgModule} from '@angular/core';
import {TasksComponent} from './pages/tasks.component';
import {TaskListComponent} from './pages/task-list/task-list.component';
import {TasksRoutingModule} from './tasks-routing.module';
import {RouterModule} from '@angular/router';
import { TaskBoardComponent } from './pages/task-board/task-board.component';

@NgModule({
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskBoardComponent
  ],
  imports: [
    RouterModule,
    TasksRoutingModule
  ]
})
export class TasksModule {}
