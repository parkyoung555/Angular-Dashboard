import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit, OnDestroy {

  title: string;

  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const activeRouteData = this.route.snapshot.firstChild ? this.route.snapshot.firstChild.data : this.route.snapshot.data;
      this.title = activeRouteData.title;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
