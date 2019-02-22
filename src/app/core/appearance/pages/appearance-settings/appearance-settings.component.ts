import { Component, OnInit, OnDestroy } from '@angular/core';
import {appThemes, AppearanceService} from '../../services/appearance.service';
import {AppTheme} from '../../models/appearance.models';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-appearance-settings',
  templateUrl: './appearance-settings.component.html',
  styleUrls: ['./appearance-settings.component.scss']
})
export class AppearanceSettingsComponent implements OnInit, OnDestroy {

  themes = appThemes;
  currentTheme: string;
  darkMode: boolean;

  private appearanceServiceCurrentThemeSubscription: Subscription;
  private appearanceServiceDarkModeSubscription: Subscription;

  constructor(
    private appearanceService: AppearanceService
  ) {

  }

  ngOnInit() {
    this.appearanceServiceCurrentThemeSubscription = this.appearanceService.currentTheme.subscribe(theme => {
      this.currentTheme = theme.name;
    });
    this.appearanceServiceDarkModeSubscription = this.appearanceService.darkMode.subscribe(darkMode => {
      this.darkMode = darkMode;
    });
  }

  setTheme(theme: AppTheme) {
    this.appearanceService.setTheme(theme);
  }

  toggleDarkMode() {
    this.appearanceService.toggleDarkMode();
  }

  ngOnDestroy(): void {
    this.appearanceServiceCurrentThemeSubscription.unsubscribe();
    this.appearanceServiceDarkModeSubscription.unsubscribe();
  }

}
