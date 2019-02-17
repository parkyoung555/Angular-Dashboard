import { Injectable } from '@angular/core';
import {Route} from '@angular/router';
import {NavigationItemModel} from '../../core/navigation/models/navigation-item.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  static isRouteVisibleInUserMenu(route: Route) {
    return route.data && route.data.navigation && route.data.navigation.showInUserMenu !== void (0);
  }

  constructor(

  ) { }

  getAccountMenuLinksFromRouteConfig(routes: Route[], parentRoute: Route | null = null): Array<NavigationItemModel> {
    return routes.reduce((flattened, route) => {
      return flattened.concat(route.children ? this.getAccountMenuLinksFromRouteConfig(route.children, route) :
        (AccountService.isRouteVisibleInUserMenu(route) ? [<NavigationItemModel>{
          path: `${parentRoute ? `${parentRoute.path}/` : ''}${route.path}`,
          title: route.data.navigation.userMenuTitle || route.data.navigation.title,
          position: route.data.navigation.showInUserMenu,
          icon: route.data.navigation.icon,
        }] : []));
    }, []).sort((a, b) => a.position - b.position );
  }
}
