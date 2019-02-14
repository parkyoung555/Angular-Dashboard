import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {NavigationItemModel} from '../models/navigation-item.model';

const storageKey = 'navigation';
const defaultIcon = 'pageview';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  lockedOpen = new BehaviorSubject(false);

  private storage: Storage;

  constructor(
    private router: Router
  ) {
    this.storage = window.localStorage;
    this.storage.setItem(storageKey, JSON.stringify(JSON.parse(this.storage.getItem(storageKey)) || {}));
    const data = JSON.parse(this.storage.getItem(storageKey));
    if (data.lockedOpen !== void(0)) {
      this.lockedOpen.next(data.lockedOpen);
    }
  }

  getMenuLinks(flat = false) {
    const routes = this.router.config,
      res: NavigationItemModel[] = [],
      positions = this.getMenuItemPositions();
    let parentItem, childMenuItem;

    for (const route of routes) {
      if (route.data && route.data.includeInSideNavigation !== void(0)) {
        parentItem = {
          icon: route.data.icon || defaultIcon,
          path: route.path,
          position: positions[route.path] !== void(0) ? positions[route.path] : route.data.includeInSideNavigation,
          title: route.data.title
        };

        if (route.children) {
          childMenuItem = void(0);
          for (const childRoute of route.children) {
            if (childRoute.data && childRoute.data.includeInSideNavigation !== void(0)) {
              childMenuItem = {
                icon: childRoute.data.icon || defaultIcon,
                path: `${route.path}/${childRoute.path}`,
                position: childRoute.data.includeInSideNavigation,
                title: childRoute.data.title
              };
              if (!flat) {
                parentItem.children = parentItem.children || [];
                parentItem.children.push(childMenuItem);
              } else {
                childMenuItem.position = parentItem.position;
                childMenuItem.title = `${route.data.title} / ${childMenuItem.title}`;
                res.push(childMenuItem);
              }
            }
          }

          if (!flat && parentItem.children) {
            parentItem.children.sort((a, b) => a.position - b.position );
          }

          if (flat && childMenuItem) {
            parentItem = void(0);
          }
        }

        if (parentItem) {
          res.push(parentItem);
        }
      }
    }

    return res.sort((a, b) => a.position - b.position );
  }

  setMenuItemPositions(menuItems: Array<NavigationItemModel>) {
    const data = JSON.parse(this.storage.getItem(storageKey));
    data.sideNavigationOrder = data.sideNavigationOrder || {};
    for (let i = 0, len = menuItems.length; i < len; i++) {
      data.sideNavigationOrder[menuItems[i].path] = i;
    }
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  getMenuItemPositions() {
    return JSON.parse(this.storage.getItem(storageKey)).sideNavigationOrder || {};
  }

  toggleLock() {
    // this.lockedOpen = !this.lockedOpen;
    const data = JSON.parse(this.storage.getItem(storageKey)),
      lockedOpen = !data.lockedOpen;

    this.lockedOpen.next(lockedOpen);

    data.lockedOpen = lockedOpen;
    this.storage.setItem(storageKey, JSON.stringify(data));

    return this.lockedOpen.getValue();
  }

  isLocked() {
    return this.lockedOpen.getValue();
  }
}
