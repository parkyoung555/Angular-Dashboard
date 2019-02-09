import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import {NavigationItemModel} from '../../../core/navigation/models/navigation-item.model';

const settingsPathName = 'settings';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  name: string;
  menuItems: NavigationItemModel[] = [];
  profileImageUrl: string;

  private username = 'parkyoung555';

  constructor(
    private router: Router
  ) {
    this.profileImageUrl = `https://github.com/identicons/${this.username}.png`;
    this.name = 'Young Park';
  }

  ngOnInit() {
    let settingsRoute: Route;
    for (let i = 0, len = this.router.config.length; i < len; i++) {
      if (this.router.config[i].path === settingsPathName) {
        settingsRoute = this.router.config[i];
        break;
      }
    }

    if (settingsRoute && settingsRoute.children) {
      settingsRoute.children.forEach(settingsChildRoute => {
        if (settingsChildRoute.data.includeInUserMenu !== void(0)) {
          this.menuItems.push({
            icon: settingsChildRoute.data.icon,
            path: `${settingsPathName}/${settingsChildRoute.path}`,
            title: settingsChildRoute.data.title,
            position: settingsChildRoute.data.includeInUserMenu
          });
        }
      });
    }

    this.menuItems.sort((a, b) => a.position - b.position );
  }

}
