export interface NavigationItemModel {
  icon: string;
  path: string;
  position?: number;
  title: string;
  expanded?: boolean;
  children?: [NavigationItemModel];
  [propName: string]: any;
}
