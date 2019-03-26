import { Component, OnInit } from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {TaskModel, TaskStatus, TaskStatusModel} from '../../models/tasks.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  lanes: Array<TaskStatusModel>;
  tasks: { [statusValue: string]: Array<TaskModel> } = {};

  constructor(
    private tasksService: TasksService,
  ) {
    this.lanes = this.tasksService.getStatuses();

    this.lanes.forEach(lane => {
      this.tasks[lane.value] = this.tasksService.getAllTasksInStatus(lane.value);
    });
  }

  ngOnInit() {
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
