import {NgModule} from '@angular/core';
import {TasksComponent} from './pages/tasks.component';
import {TaskListComponent} from './pages/task-list/task-list.component';
import {TasksRoutingModule} from './tasks-routing.module';
import {RouterModule} from '@angular/router';
import { TaskBoardComponent } from './pages/task-board/task-board.component';
import {CreateTaskDialogComponent} from './components/create-task-dialog/create-task-dialog.component';
import {CreateTaskFormModule} from './components/create-task-form/create-task-form.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatButtonModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule,
  MatListModule, MatMenuModule, MatSidenavModule,
  MatSnackBarModule, MatTooltipModule, MatToolbarModule
} from '@angular/material';
import {InlineNavigationModule} from '../core/navigation/components/inline-navigation/inline-navigation.module';
import {CommonModule} from '@angular/common';
import {EmptyMessageModule} from '../core/empty-message/components/empty-message/empty-message.module';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import {ConfirmDialogModule} from '../core/confirm-dialog/confirm-dialog.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    CreateTaskDialogComponent,
    TasksComponent,
    TaskListComponent,
    TaskBoardComponent,
    TaskDetailsComponent
  ],
  entryComponents: [
    CreateTaskDialogComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    CreateTaskFormModule,
    DragDropModule,
    EmptyMessageModule,
    FlexLayoutModule,
    InlineNavigationModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    TasksRoutingModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 6000
      }
    }
  ]
})
export class TasksModule {}
