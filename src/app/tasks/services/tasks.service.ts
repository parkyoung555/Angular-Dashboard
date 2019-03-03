import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {StorageService} from '../../core/storage/services/storage.service';
import {TaskModel, TaskPriority, TasksResponseModel, TaskStatus, TaskType} from '../models/tasks.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {formatDate} from '@angular/common';

const storageKey = 'tasks';

const baseStatuses = [
  new TaskStatus({ label: 'Todo', value: 'todo' }),
  new TaskStatus({ label: 'In progress', value: 'inprogress' }),
  new TaskStatus({ label: 'Done', value: 'done' })
];

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  addedTask = new Subject<TaskModel>();

  static getIndicesFromData(data: TasksResponseModel, key: string) {
    data.indices = data.indices || {};
    data.indices[key] = data.indices[key] || {};
    return data.indices[key];
  }

  static getTasksFromData(data: TasksResponseModel) {
    data.tasks = data.tasks || [];
    return data.tasks;
  }

  static getStatusesFromData(data: TasksResponseModel) {
    data.statuses = data.statuses || [];
    return data.statuses;
  }

  constructor(
    private storage: StorageService,
    @Inject(LOCALE_ID) private locale: string
  ) {

  }

  getTasks() {
    return (this.getData().tasks || []).sort((a, b) => {
      // Sort by position then by creation date
      return a.position - b.position || new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
    });
  }

  getTask(taskId: string) {
    const data = this.getData(),
      tasks = TasksService.getTasksFromData(data),
      tasksIndices = TasksService.getIndicesFromData(data, 'tasks');

    return tasks[tasksIndices[taskId]];
  }

  addTask(task: TaskModel) {
    const data = this.getData(),
      tasks = TasksService.getTasksFromData(data),
      tasksIndices = TasksService.getIndicesFromData(data, 'tasks');

    task.status = this.getStatuses()[0].value;

    tasks.push(task);
    tasksIndices[task._id] = tasks.length - 1;

    this.save(data);
    this.addedTask.next(task);
  }

  removeTask(taskId: string) {
    const data = this.getData(),
      tasks = TasksService.getTasksFromData(data),
      tasksIndices = TasksService.getIndicesFromData(data, 'tasks');

    tasks.splice(tasksIndices[taskId]);
    delete tasksIndices[taskId];

    this.save(data);
  }

  getStatuses() {
    return (this.getData().statuses || baseStatuses).sort((a, b) => a.position - b.position );
  }

  getStatus(statusValue: string) {
    const data = this.getData(),
      statuses = TasksService.getStatusesFromData(data),
      statusIndices = TasksService.getIndicesFromData(data, 'statuses');

    return statuses[statusIndices[statusValue]];
  }

  removeStatus(statusValue: string) {
    const data = this.getData(),
      statuses = TasksService.getStatusesFromData(data),
      statusIndices = TasksService.getIndicesFromData(data, 'statuses');

    statuses.splice(statusIndices[statusValue]);
    delete statusIndices[statusValue];

    this.save(data);
  }

  getAllTasksInStatus(statusValue: string) {
    return this.getTasks().filter(task => {
      return task.status === statusValue;
    });
  }

  setStatusPosition(statusValue: string, position: number) {
    const data = this.getData(),
      statuses = TasksService.getStatusesFromData(data),
      statusIndices = TasksService.getIndicesFromData(data, 'statuses');

    statuses[statusIndices[statusValue]].position = position;

    this.save(data);
  }

  setTaskPosition(taskId: string, position: number) {
    const data = this.getData(),
      tasks = TasksService.getTasksFromData(data),
      tasksIndices = TasksService.getIndicesFromData(data, 'tasks');

    tasks[tasksIndices[taskId]].position = position;

    this.save(data);
  }

  moveTaskToStatus(taskId: string, statusValue: string) {
    const data = this.getData(),
      tasks = TasksService.getTasksFromData(data),
      tasksIndices = TasksService.getIndicesFromData(data, 'tasks');

    tasks[tasksIndices[taskId]].status = statusValue;

    this.save(data);
  }

  getDueDateString(date: Date) {
    let dateString = '';
    const today = new Date(),
      threshHold = 5,
      daysUntil = Math.ceil((date.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

    if (date.toDateString() === today.toDateString()) {
      dateString = 'Due today';
    } else if (daysUntil < 0) {
      dateString = 'Overdue';
    } else if (daysUntil <= threshHold) {
      dateString = daysUntil > 1 ? `Due in ${daysUntil} days` : 'Due tomorrow';
    } else {
      dateString = `Due ${formatDate(date, 'longDate', this.locale)}`;
    }

    return dateString;
  }

  private getData(): TasksResponseModel {
    return this.storage.getData(storageKey) || {};
  }

  private save(data: TasksResponseModel) {
    this.storage.setData(storageKey, data);
  }
}
