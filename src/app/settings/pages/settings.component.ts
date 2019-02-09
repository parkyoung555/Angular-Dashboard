import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationItemModel} from '../../core/navigation/models/navigation-item.model';

const defaultIcon = 'pageview';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  links: Array<NavigationItemModel>;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.links = this.getMenuLinks();
  }

  private getMenuLinks() {
    const routes = this.route.routeConfig.children,
      res = [
        {
          title: 'Home',
          path: './',
          icon: 'home',
          position: -1
        }
      ];

    for (const route of routes) {
      if (route.data) {
        res.push({
          icon: route.data.icon || defaultIcon,
          path: route.path,
          position: route.data.includeInSideNavigation,
          title: route.data.title
        });
      }
    }

    return res.sort((a, b) => a.position - b.position );
  }
}
