import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PRIMARY_OUTLET, Route, Router, RouterEvent} from '@angular/router';
import {NavigationItemModel, RouteNavigationDataModel} from '../models/navigation-item.model';
import {StorageService} from '../../storage/services/storage.service';

const storageKey = 'navigation';
const defaultIcon = 'pageview';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  lockedOpen = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: StorageService
  ) {
    const data = this.storage.getData(storageKey) || {};
    this.storage.setData(storageKey, data);
    if (data.lockedOpen !== void(0)) {
      this.lockedOpen.next(data.lockedOpen);
    }
  }

  getParentRoutePath(route: RouterEvent) {
    const parsedUrl = this.router.parseUrl(route.url);
    if (!parsedUrl.root.numberOfChildren) {
      return '';
    }
    return parsedUrl.root.children[PRIMARY_OUTLET].segments[0].path;
  }

  getMenuLinks(flat = false) {
    const routes = this.router.config,
      res: NavigationItemModel[] = [],
      positions = this.getMenuItemPositions();
    let parentItem: NavigationItemModel,
      childMenuItem: NavigationItemModel,
      routeNavigationData: RouteNavigationDataModel,
      childRouteNavigationData: RouteNavigationDataModel;

    for (const route of routes) {
      if (route.data && route.data.navigation && route.data.navigation.showInNavigation !== void(0)) {
        routeNavigationData = route.data.navigation;

        parentItem = {
          icon: routeNavigationData.icon || defaultIcon,
          path: route.path,
          position: positions[route.path] !== void(0) ? positions[route.path] : routeNavigationData.showInNavigation,
          title: routeNavigationData.title,
          displayChildrenAs: routeNavigationData.displayChildrenAs
        };

        if (route.children) {
          childMenuItem = void(0);
          for (const childRoute of route.children) {
            if (childRoute.data && childRoute.data.navigation && childRoute.data.navigation.showInNavigation !== void(0)) {
              childRouteNavigationData = childRoute.data.navigation;

              childMenuItem = {
                icon: childRouteNavigationData.icon || defaultIcon,
                path: `${route.path}/${childRoute.path}`,
                position: childRouteNavigationData.showInNavigation,
                title: childRouteNavigationData.title
              };
              if (!flat) {
                parentItem.children = parentItem.children || [];
                parentItem.children.push(childMenuItem);
              } else {
                childMenuItem.position = parentItem.position;
                childMenuItem.title = `${routeNavigationData.title} / ${childMenuItem.title}`;
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

  getChildMenuLinks(pathName: string) {
    const routes = this.router.config,
      res: NavigationItemModel[] = [];
    let parent: Route,
      childRouteNavigationData: RouteNavigationDataModel;

    for (const route of routes) {
      if (route.path === pathName) {
        parent = route;
        break;
      }
    }
    if (parent.children) {
      for (const children of parent.children) {
        if (children.data && children.data.navigation && children.data.navigation.showInNavigation !== void(0)) {
          childRouteNavigationData = children.data.navigation;
          res.push({
            icon: childRouteNavigationData.icon || defaultIcon,
            // path: `${parent.path}/${children.path}`,
            path: children.path,
            position: childRouteNavigationData.showInNavigation,
            title: childRouteNavigationData.title
          });
        }
      }
    }
    return res.sort((a, b) => a.position - b.position );
  }

  setMenuItemPositions(menuItems: Array<NavigationItemModel>) {
    const data = this.storage.getData(storageKey);
    data.sideNavigationOrder = data.sideNavigationOrder || {};
    for (let i = 0, len = menuItems.length; i < len; i++) {
      data.sideNavigationOrder[menuItems[i].path] = i;
    }
    this.storage.setData(storageKey, data);
  }

  getMenuItemPositions() {
    return this.storage.getData(storageKey).sideNavigationOrder || {};
  }

  toggleLock() {
    const data = this.storage.getData(storageKey),
      lockedOpen = !data.lockedOpen;

    this.lockedOpen.next(lockedOpen);

    data.lockedOpen = lockedOpen;
    this.storage.setData(storageKey, data);

    return this.lockedOpen.getValue();
  }

  isLocked() {
    return this.lockedOpen.getValue();
  }
}
