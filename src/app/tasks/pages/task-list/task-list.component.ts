import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TaskModel} from '../../models/tasks.model';
import {TasksService} from '../../services/tasks.service';
import {Subscription, pipe} from 'rxjs';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';

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
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ])
    ])
  ],
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Array<TaskModel>;
  taskDetailDrawerOpened: boolean;

  private addedTaskSubscription: Subscription;
  private routeEventSubscription: Subscription;

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
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
   this.addedTaskSubscription.unsubscribe();
   this.routeEventSubscription.unsubscribe();
  }

}
