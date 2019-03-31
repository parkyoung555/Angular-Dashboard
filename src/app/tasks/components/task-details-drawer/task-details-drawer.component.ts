import {Component, ElementRef, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-task-details-drawer',
  templateUrl: './task-details-drawer.component.html',
  styleUrls: ['./task-details-drawer.component.scss']
})
export class TaskDetailsDrawerComponent implements OnInit, OnDestroy {

  routeSubscription: Subscription;
  taskId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.taskId = params.get('taskId');

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

  closeDrawer() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }
}
