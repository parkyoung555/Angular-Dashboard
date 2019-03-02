import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Task} from '../../models/tasks.model';
import {TasksService} from '../../services/tasks.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

  newTaskForm = new FormGroup({});

  constructor(
    private tasksService: TasksService,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>
  ) { }

  ngOnInit() {
  }

  addTask() {
    if (!this.newTaskForm.valid) {
      console.error('Invalid form...');
      return;
    }

    const task = new Task(this.newTaskForm.value);
    this.tasksService.addTask(task);
    this.dialogRef.close(task);
  }

}
