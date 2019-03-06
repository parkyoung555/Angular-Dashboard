import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TasksService} from '../../services/tasks.service';
import {TaskModel, taskStatuses, TaskStatusModel, TaskTypeModel, taskTypes} from '../../models/tasks.model';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../../core/confirm-dialog/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

  task: TaskModel;
  taskStatuses: Array<TaskStatusModel>;
  taskTypes: Array<TaskTypeModel>;

  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private dialog: MatDialog
  ) {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.task = this.tasksService.getTask(params.get('taskId'));
      if (this.task) {
        this.taskStatuses = this.getTransitionableStatuses(this.task.status);
        this.taskTypes = this.getTransitionableTypes(this.task.type);
      }
      // console.log(this.elementRef);
      const parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
      if (parentElement) {
        parentElement.scrollTop = 0;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  deleteTask() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this task?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.tasksService.removeTask(this.task._id);
        this.router.navigate(['../'], {
          relativeTo: this.route
        });
      }
    });
  }

  updateStatus(status: TaskStatusModel) {
    this.task.status = status;
    this.taskStatuses = this.getTransitionableStatuses(status);
  }

  updateType(type: TaskTypeModel) {
    this.task.type = type;
    this.taskTypes = this.getTransitionableTypes(type);
  }

  private getTransitionableStatuses(currentStatus: TaskStatusModel) {
    return taskStatuses.filter(status => status.value !== currentStatus.value);
  }

  private getTransitionableTypes(currentType: TaskTypeModel) {
    return taskTypes.filter(type => type.value !== currentType.value);
  }
}
