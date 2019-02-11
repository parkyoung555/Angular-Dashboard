import {Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {NavigationService} from './core/navigation/services/navigation.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AppearanceService} from './core/appearance/services/appearance.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  sideNavClosed: boolean;
  navHovered: boolean;
  navLockedOpen: boolean;
  showNavLockAction: boolean;
  sideNavMode: string;
  themeClass: string;

  private appearanceServiceThemeClassSubscription: Subscription;
  private navigationServiceIsLockedSubscription: Subscription;
  private routerSubscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private appearanceService: AppearanceService,
    private navigationService: NavigationService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {

    iconRegistry.addSvgIcon(
      'angular',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/angular.svg')
    );
  }

  ngOnInit(): void {
    this.navLockedOpen = this.navigationService.isLocked();

    this.navigationServiceIsLockedSubscription = this.navigationService.lockedOpen.subscribe(lockedOpen => {
      this.navLockedOpen = lockedOpen;
      if (!this.navLockedOpen) {
        this.navHovered = false;
      }
    });

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      if (!this.navigationService.isLocked()) {
        this.navHovered = false;
      }
    });

    // Theme classes
    this.appearanceServiceThemeClassSubscription = this.appearanceService.themeClass.subscribe(themeClass => {
      this.updateBodyThemeClass(themeClass);
    });
  }

  ngOnDestroy(): void {
    this.appearanceServiceThemeClassSubscription.unsubscribe();
    this.navigationServiceIsLockedSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  private updateBodyThemeClass(themeClass: string) {
    if (this.themeClass) {
      this.renderer.removeClass(document.body, this.themeClass);
    }
    
    this.themeClass = themeClass;

    if (this.themeClass) {
      this.renderer.addClass(document.body, this.themeClass);
    }
  }
}
