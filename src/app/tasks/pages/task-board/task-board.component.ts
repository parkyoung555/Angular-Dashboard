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
      transition('void => in', [
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
  removedTaskSubscription: Subscription;
  tasks: { [statusValue: string]: Array<TaskModel> } = {};
  updatedTaskSubscription: Subscription;

  constructor(
    private tasksService: TasksService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.lanes = this.tasksService.getStatuses();

    this.lanes.forEach(lane => {
      this.tasks[lane.value] = this.tasksService.getAllTasksInStatus(lane.value);
    });

    this.addedTaskSubscription = this.tasksService.addedTask.subscribe(task => {
      task.isNew = 'in';
      this.tasks[task.status.value].unshift(task);
      this.changeDetectorRef.detectChanges();
    });

    this.updatedTaskSubscription = this.tasksService.updatedTask.subscribe(() => {
      this.lanes.forEach(lane => {
        this.tasks[lane.value] = this.tasksService.getAllTasksInStatus(lane.value);
      });
      this.changeDetectorRef.detectChanges();
    });

    this.removedTaskSubscription = this.tasksService.removedTask.subscribe(() => {
      this.lanes.forEach(lane => {
        this.tasks[lane.value] = this.tasksService.getAllTasksInStatus(lane.value);
      });
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.addedTaskSubscription.unsubscribe();
    this.removedTaskSubscription.unsubscribe();
    this.updatedTaskSubscription.unsubscribe();
  }

  laneDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lanes, event.previousIndex, event.currentIndex);
  }

  taskDropped(event: CdkDragDrop<string[]>, status: TaskStatusModel) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.tasks[status.value], event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const movedTask = <TaskModel><unknown>event.container.data[event.currentIndex];
      movedTask.status = status;
      this.tasksService.updateTask(movedTask);
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

  taskAddedAnimationDone(task: TaskModel) {
    delete task.isNew;
  }

}
