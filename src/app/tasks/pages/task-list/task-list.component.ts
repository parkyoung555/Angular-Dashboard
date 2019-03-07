import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {TaskModel} from '../../models/tasks.model';
import {TasksService} from '../../services/tasks.service';
import {Subscription, pipe} from 'rxjs';
import {animate, query, state, style, transition, trigger} from '@angular/animations';
import {MatDrawer, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [
    trigger('preventInitialChildAnimations', [
      transition(':enter', [
        query(':enter', [], { optional: true })
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({
          height: 0,
          opacity: 0,
          overflow: 'hidden',
          transform: 'translateX(-100%)'
        }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
          height: '*',
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ]),
      transition(':leave', [
        style({
          overflow: 'hidden'
        }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
          height: 0,
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ],
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Array<TaskModel>;
  taskDetailDrawerOpened: boolean;

  private addedTaskSubscription: Subscription;
  private removedTaskSubscription: Subscription;
  private updatedTaskSubscription: Subscription;
  private routeEventSubscription: Subscription;
  @ViewChild('taskDetailsDrawer') private taskDetailsDrawer: MatDrawer;

  constructor(
    private tasksService: TasksService,
    private changeDetectorRef: ChangeDetectorRef,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tasks = this.tasksService.getTasks().map(task => {
      task.dueDateDisplay = this.tasksService.getDueDateString(new Date(task.dueDate));
      return task;
    });

    this.addedTaskSubscription = this.tasksService.addedTask.subscribe(task => {
      task.dueDateDisplay = this.tasksService.getDueDateString(new Date(task.dueDate));
      this.tasks.unshift(task);
      this.changeDetectorRef.detectChanges();
    });

    this.removedTaskSubscription = this.tasksService.removedTask.subscribe(deletedTaskId => {
      for (let i = 0, len = this.tasks.length; i < len; i++) {
        if (this.tasks[i]._id === deletedTaskId) {
          this.tasks.splice(i, 1);
          break;
        }
      }
    });

    this.updatedTaskSubscription = this.tasksService.updatedTask.subscribe(updatedTask => {
      updatedTask.dueDateDisplay = this.tasksService.getDueDateString(new Date(updatedTask.dueDate));
      for (let i = 0, len = this.tasks.length; i < len; i++) {
        if (this.tasks[i]._id === updatedTask._id) {
          Object.assign(this.tasks[i], updatedTask);
          break;
        }
      }
    });

    this.iconRegistry.addSvgIcon(
      'priority_high',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/chevron-double-up.svg')
    );

    this.iconRegistry.addSvgIcon(
      'priority_critical',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/chevron-triple-up.svg')
    );

    this.routeEventSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.taskDetailDrawerOpened = !!this.route.snapshot.firstChild;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
   this.addedTaskSubscription.unsubscribe();
   this.removedTaskSubscription.unsubscribe();
   this.updatedTaskSubscription.unsubscribe();
   this.routeEventSubscription.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

}
