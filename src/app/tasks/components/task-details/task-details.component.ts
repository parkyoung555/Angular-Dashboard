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

  editorFocused: boolean;
  editorCurrentData: string;
  quillModules = {
    clipboard: {
      matchVisual: false
    },
    syntax: true
  };
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
      this.editorFocused = false;
      this.task = this.tasksService.getTask(params.get('taskId'));
      if (this.task) {
        this.taskStatuses = this.getTransitionableStatuses(this.task.status);
        this.taskTypes = this.getTransitionableTypes(this.task.type);
        this.editorCurrentData = this.task.description;
      }
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

  editorChanged(event) {
    if (event.range) {
      this.editorFocused = true;
    } else { // Save data on blur
      this.editorFocused = false;
      this.editorCurrentData = (this.editorCurrentData || '')
          .replace(/<p>\s*<\/p>/gi, '')
          // .replace(/^(<p><br><\/p>)*|(<p><br><\/p>)*$/gim, '')
          .replace(/<p><br><\/p>/gi, '');
      this.task.description = this.editorCurrentData;
      this.updateTask();
    }
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

  updateTaskTitle(title: string) {
    this.task.title = title;
    this.updateTask();
  }

  updateStatus(status: TaskStatusModel) {
    this.task.status = status;
    this.taskStatuses = this.getTransitionableStatuses(status);
    this.updateTask();
  }

  updateType(type: TaskTypeModel) {
    this.task.type = type;
    this.taskTypes = this.getTransitionableTypes(type);
    this.updateTask();
  }

  private updateTask() {
    this.tasksService.updateTask(this.task);
  }

  private getTransitionableStatuses(currentStatus: TaskStatusModel) {
    return taskStatuses.filter(status => status.value !== currentStatus.value);
  }

  private getTransitionableTypes(currentType: TaskTypeModel) {
    return taskTypes.filter(type => type.value !== currentType.value);
  }
}
