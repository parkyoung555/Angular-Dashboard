import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {taskPriorities, TasksService, taskTypes} from '../../services/tasks.service';
import {TaskPriority, TaskType} from '../../models/tasks.model';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent implements OnInit {

  @Input() newTaskForm: FormGroup;
  taskPriorities: Array<TaskPriority>;
  taskTypes: Array<TaskType>;

  constructor(
    private tasksService: TasksService,
    private fb: FormBuilder,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.taskPriorities = taskPriorities;
    this.taskTypes = taskTypes;

    iconRegistry.addSvgIcon(
      'priority_high',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/chevron-double-up.svg')
    );
    iconRegistry.addSvgIcon(
      'priority_critical',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/chevron-triple-up.svg')
    );

    // this.newTaskForm.addControl('title', new FormControl(['', Validators.required]));
    // this.newTaskForm = fb.group({
    //   title: ['', Validators.required],
    //   description: [''],
    //   priority: [this.taskPriorities[1], Validators.required],
    //   dueDate: [],
    //   type: [this.taskTypes[0], Validators.required]
    // });
  }

  ngOnInit() {
    this.newTaskForm.addControl('title', new FormControl('', Validators.required));
    this.newTaskForm.addControl('description', new FormControl());
    this.newTaskForm.addControl('priority', new FormControl(this.taskPriorities[1], Validators.required));
    this.newTaskForm.addControl('dueDate', new FormControl());
    this.newTaskForm.addControl('type', new FormControl(this.taskTypes[0], Validators.required));
  }

}
