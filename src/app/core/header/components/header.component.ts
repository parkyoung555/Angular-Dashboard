import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import {filter, map, mergeMap} from 'rxjs/operators';
import {MatSidenav} from '@angular/material';

const defaultIcon = 'pageview';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Public variables
  @Input() mainNav: MatSidenav;
  @Input() showNavLockAction: boolean;
  headerLinks: Array<Object>;
  theme: string;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((event) => {
      this.titleService.setTitle(event['title']);
      this.title = event['title'];
      this.theme = event['theme'] !== void(0) ? event['theme'] : '';
    });

    // this.headerLinks = this.getHeaderLinks();
    // console.log(this.headerLinks);
  }

  toggleMenu() {
    this.mainNav.toggle();
  }

  // private getHeaderLinks() {
  //   const routes = this.router.config,
  //     res = [];
  //
  //   for (const route of routes) {
  //     if (route.data && route.data.includeInHeader !== void(0)) {
  //       res.push({
  //         icon: route.data.icon || defaultIcon,
  //         path: route.path,
  //         position: route.data.includeInHeader,
  //         title: route.data.title
  //       });
  //     }
  //   }
  //
  //   return res.sort((a, b) => a.position - b.position );
  // }
}
