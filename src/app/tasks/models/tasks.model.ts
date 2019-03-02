import {StorageService} from '../../core/storage/services/storage.service';

type taskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface TaskPriorityModel {
  _id?: string;
  label: string;
  value: string;
  icon?: string;
  svgIcon?: string;
}

export class TaskPriority implements TaskPriorityModel {
  _id = StorageService.getObjectId();
  label: string;
  value: string;
  icon?: string;
  svgIcon?: string;

  constructor(data: TaskPriorityModel) {
    this.label = data.label;
    this.value = data.value;
    this.icon = data.icon;
    this.svgIcon = data.svgIcon;
  }
}

export interface TaskModel {
  _id?: string;
  title: string;
  description?: string;
  priority: taskPriority;
  position: number;
  assignee?: string;
  reporter?: string;
  creationDate: Date;
  dueDate: Date;
  dueDateDisplay?: string;
  modifiedDate: Date;
  status?: any;
  type?: TaskTypeModel;
  subTasks?: Array<SubTaskModel>;
}

// Not sure if this is needed
export interface SubTaskModel {
  _id?: string;
  title: string;
  description?: string;
  position?: number;
  assignee?: string;
  reporter: string;
  creationDate: Date;
  dueDate: Date;
  modifiedDate: Date;
}

export interface TaskTypeModel {
  _id?: string;
  label: string;
  value: string;
  icon: string;
}

export class TaskType implements TaskTypeModel {
  _id = StorageService.getObjectId();
  label: string;
  value: string;
  icon: string;

  constructor(data: TaskTypeModel) {
    this.label = data.label;
    this.value = data.label;
    this.icon = data.icon;
  }
}

export interface TaskStatusModel {
  _id?: string;
  label: string;
  position?: number;
  value: string;
}

export class TaskStatus implements TaskStatusModel {
  _id = StorageService.getObjectId();
  label: string;
  position?: number;
  value: string;

  constructor(data: TaskStatusModel) {
    this.label = data.label;
    this.position = data.position || 0;
    this.value = data.value;
  }
}

export interface TasksResponseModel {
  tasks: Array<TaskModel>;
  indices: {
    tasks?: IndicesModel;
    statuses?: IndicesModel;
  };
  statuses: Array<TaskStatusModel>;
}

export interface IndicesModel {
  [_id: string]: number;
}

export class Task implements TaskModel {
  _id = StorageService.getObjectId();
  title: string;
  description?: string;
  priority: taskPriority;
  position: number;
  assignee?: string;
  reporter?: string;
  creationDate = new Date();
  dueDate: Date;
  dueDateDisplay?: string;
  modifiedDate = new Date();
  status?: any;
  type?: TaskTypeModel;
  subTasks?: Array<SubTaskModel>;

  constructor(data: TaskModel) {
    this.title = data.title;
    this.description = data.description;
    this.priority = data.priority || 'medium';
    this.position = data.position || 0;
    this.assignee = data.assignee;
    this.reporter = data.reporter;
    this.dueDate = data.dueDate;
    this.status = data.status;
    this.type = data.type;
    this.subTasks = data.subTasks;
  }
}

