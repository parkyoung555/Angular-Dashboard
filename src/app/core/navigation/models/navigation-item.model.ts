type navigationChildrenDisplay = 'ACCORDION';

export interface RouteNavigationDataModel {
  title: string;
  icon: string;
  showInNavigation?: number;
  showInUserMenu?: number;
  userMenuTitle?: string;
  displayChildrenAs?: navigationChildrenDisplay;
  theme?: string;
}

export interface NavigationItemModel {
  icon: string;
  path: string;
  position?: number;
  title: string;
  expanded?: boolean;
  children?: Array<NavigationItemModel>;
  displayChildrenAs?: navigationChildrenDisplay;
  [propName: string]: any;
}

export class RouteNavigationData implements RouteNavigationDataModel {
  title: string;
  icon: string;
  showInNavigation?: number;
  showInUserMenu?: number;
  userMenuTitle?: string;
  displayChildrenAs?: navigationChildrenDisplay;
  theme?: string;

  constructor(data: RouteNavigationDataModel) {
    this.title = data.title;
    this.icon = data.icon;
    this.showInNavigation = data.showInNavigation;
    this.showInUserMenu = data.showInUserMenu;
    this.userMenuTitle = data.userMenuTitle;
    this.displayChildrenAs = data.displayChildrenAs;
    this.theme = data.theme;
  }
}
