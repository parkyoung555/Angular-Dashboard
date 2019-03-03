import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TaskModel} from '../../models/tasks.model';
import {TasksService} from '../../services/tasks.service';
import {Subscription} from 'rxjs';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

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

    iconRegistry.addSvgIcon(
      'priority_high',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/chevron-double-up.svg')
    );
    iconRegistry.addSvgIcon(
      'priority_critical',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/chevron-triple-up.svg')
    );
  }

  ngOnInit() {
    this.taskDetailDrawerOpened = this.route.firstChild ? !!this.route.firstChild.snapshot.paramMap.get('taskId') : false;
  }

  ngOnDestroy(): void {
   this.addedTaskSubscription.unsubscribe();
  }

}
