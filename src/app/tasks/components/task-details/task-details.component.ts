import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {TasksService} from '../../services/tasks.service';
import {TaskModel} from '../../models/tasks.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

  task: TaskModel;

  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.task = this.tasksService.getTask(params.get('taskId'));
      // console.log(this.elementRef);
      const parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
      if (parentElement) {
        parentElement.scrollTop = 0;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
