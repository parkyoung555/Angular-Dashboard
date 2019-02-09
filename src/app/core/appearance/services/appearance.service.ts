import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AppTheme} from '../models/appearance.models';

export const APP_THEMES = [
  {
    name: 'Default',
    value: '',
    // colors: [ '#212121', '#2962ff' ]
  },
  {
    name: 'Watermelon',
    value: 'watermelon',
    // colors: [ '#e91e63', '#00c853' ]
  },
  {
    name: 'Sunset',
    value: 'sunset'
  },
  {
    name: 'Dan Dan',
    value: 'dan-dan'
  }
];

const DARK_THEME_POSTFIX = 'dark-theme',
  STORAGE_KEY = 'appearanceSettings';

@Injectable({
  providedIn: 'root'
})
export class AppearanceService {

  currentTheme: BehaviorSubject<AppTheme> = new BehaviorSubject(APP_THEMES[0]);
  darkMode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  themeClass: BehaviorSubject<string> = new BehaviorSubject(this.getThemeClass());

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
    const data = JSON.parse(this.storage.getItem(STORAGE_KEY));
    this.storage.setItem(STORAGE_KEY, JSON.stringify(data || {}));
    this.currentTheme.next(data && data.currentTheme ? data.currentTheme : this.currentTheme.getValue());
    this.darkMode.next(data.darkMode);
    this.themeClass.next(this.getThemeClass());
  }

  setTheme(theme: AppTheme) {
    const data = JSON.parse(this.storage.getItem(STORAGE_KEY));
    data.currentTheme = theme;
    this.storage.setItem(STORAGE_KEY, JSON.stringify(data || {}));
    this.currentTheme.next(theme);
    this.themeClass.next(this.getThemeClass());
  }

  toggleDarkMode() {
    const data = JSON.parse(this.storage.getItem(STORAGE_KEY));
    data.darkMode = !data.darkMode;
    this.storage.setItem(STORAGE_KEY, JSON.stringify(data || {}));
    this.darkMode.next(data.darkMode);
    this.themeClass.next(this.getThemeClass());
  }

  getThemeClass() {
    const themeName = this.currentTheme.getValue().value;
    return themeName + ( this.darkMode.getValue() ? ( themeName ? '-' : '' ) + DARK_THEME_POSTFIX : '' );
  }
}
