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

  getMenuLinks() {
    const routes = this.router.config,
      res: NavigationItemModel[] = [];

    for (const route of routes) {
      if (route.data && route.data.includeInSideNavigation !== void(0)) {
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
