import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AppTheme} from '../models/appearance.models';
import {StorageService} from '../../storage/services/storage.service';

export const appThemes = [
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
  storageKey = 'appearanceSettings';

@Injectable({
  providedIn: 'root'
})
export class AppearanceService {

  currentTheme: BehaviorSubject<AppTheme> = new BehaviorSubject(appThemes[0]);
  darkMode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  themeClass: BehaviorSubject<string> = new BehaviorSubject(this.getThemeClass());

  constructor(
    private storage: StorageService
  ) {
    const data = this.storage.getData(storageKey) || {};
    this.storage.setData(storageKey, data);
    this.currentTheme.next(data && data.currentTheme ? data.currentTheme : this.currentTheme.getValue());
    this.darkMode.next(data.darkMode);
    this.themeClass.next(this.getThemeClass());
  }

  setTheme(theme: AppTheme) {
    const data = this.storage.getData(storageKey);
    data.currentTheme = theme;
    this.storage.setData(storageKey, data);
    this.currentTheme.next(theme);
    this.themeClass.next(this.getThemeClass());
  }

  toggleDarkMode() {
    const data = this.storage.getData(storageKey);
    data.darkMode = !data.darkMode;
    this.storage.setData(storageKey, data);
    this.darkMode.next(data.darkMode);
    this.themeClass.next(this.getThemeClass());
  }

  getThemeClass() {
    const themeName = this.currentTheme.getValue().value;
    return themeName + ( this.darkMode.getValue() ? ( themeName ? '-' : '' ) + DARK_THEME_POSTFIX : '' );
  }
}
