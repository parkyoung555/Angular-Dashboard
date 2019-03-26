import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {TaskModel, TaskStatus, TaskStatusModel} from '../../models/tasks.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Subscription} from 'rxjs';
import {animate, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  animations: [
    trigger('preventInitialChildAnimations', [
      transition(':enter', [
        query(':enter', [], { optional: true })
      ])
    ]),
    trigger('pushDown', [
      transition(':enter', [
        style({
          height: 0,
          marginBottom: '0',
          marginTop: '0',
          overflow: 'hidden',
          paddingBottom: '0',
          paddingTop: '0',
          transform: 'translateY(-100%)'
        }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
          height: '*',
          marginBottom: '*',
          marginTop: '*',
          paddingBottom: '*',
          paddingTop: '*',
          transform: 'translateY(0)'
        }))
      ])
    ])
  ]
})
export class TaskBoardComponent implements OnInit, OnDestroy {

  addedTaskSubscription: Subscription;
  lanes: Array<TaskStatusModel>;
  tasks: { [statusValue: string]: Array<TaskModel> } = {};

  constructor(
    private tasksService: TasksService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.lanes = this.tasksService.getStatuses();

    this.lanes.forEach(lane => {
      this.tasks[lane.value] = this.tasksService.getAllTasksInStatus(lane.value);
    });

    this.addedTaskSubscription = this.tasksService.addedTask.subscribe(task => {
      this.tasks[task.status.value].unshift(task);
      console.log(task);
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.addedTaskSubscription.unsubscribe();
  }

  laneDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lanes, event.previousIndex, event.currentIndex);
  }

  taskDropped(event: CdkDragDrop<string[]>, status: TaskStatusModel) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.tasks[status.value], event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getDraggableLanes(lane: TaskStatusModel) {
    return this.lanes
      .filter(l => l.value !== lane.value)
      .map(l => l.value);
  }

  addStatus() {
    const statusValue = 'status' + this.lanes.length;
    this.lanes.push(new TaskStatus({
      label: 'New Status ' + this.lanes.length,
      value: statusValue
    }));

    this.tasks[statusValue] = [];
  }

}
