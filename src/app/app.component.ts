import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NavigationService} from './core/navigation/services/navigation.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AppearanceService} from './core/appearance/services/appearance.service';
import {Subscription} from 'rxjs';
// import {NavigationItemModel} from './core/navigation/models/navigation-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  // inlineNavLinks: Array<NavigationItemModel>;
  sideNavClosed: boolean;
  navHovered: boolean;
  navLockedOpen: boolean;
  showNavLockAction: boolean;
  sideNavMode: string;
  themeClass: string;

  private appearanceServiceThemeClassSubscription: Subscription;
  private navigationServiceIsLockedSubscription: Subscription;
  // private previousRouteEvent: NavigationEnd;
  private routerSubscriptionNavStart: Subscription;
  private routerSubscriptionNavEnd: Subscription;

  constructor(
    private renderer: Renderer2,
    private appearanceService: AppearanceService,
    private navigationService: NavigationService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
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

    this.routerSubscriptionNavStart = this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      if (!this.navigationService.isLocked()) {
        this.navHovered = false;
      }
    });

    // this.routerSubscriptionNavEnd = this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   const route = this.route.snapshot.firstChild,
    //     lastParentPath = this.previousRouteEvent ? this.navigationService.getParentRoutePath(this.previousRouteEvent) : '',
    //     currentParentPath = this.navigationService.getParentRoutePath(event);
    //
    //   if (route.data && route.data.navigation && route.data.navigation.displayChildrenAs === 'INLINE') {
    //     if (lastParentPath !== currentParentPath) {
    //       this.inlineNavLinks = this.navigationService.getChildMenuLinks(currentParentPath);
    //     }
    //   } else {
    //     this.inlineNavLinks = [];
    //   }
    //
    //   this.previousRouteEvent = event;
    // });

    // Theme classes
    this.appearanceServiceThemeClassSubscription = this.appearanceService.themeClass.subscribe(themeClass => {
      this.updateBodyThemeClass(themeClass);
    });
  }

  ngOnDestroy(): void {
    this.appearanceServiceThemeClassSubscription.unsubscribe();
    this.navigationServiceIsLockedSubscription.unsubscribe();
    this.routerSubscriptionNavStart.unsubscribe();
    this.routerSubscriptionNavEnd.unsubscribe();
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
