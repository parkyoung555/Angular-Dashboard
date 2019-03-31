import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatDrawer, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {NavigationService} from '../../services/navigation.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {NavigationItemModel} from '../../models/navigation-item.model';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

const navigationBreakpoints = {
  large: 1400,
  medium: 960
};

const sideNavModes = {
  side: 'side',
  over: 'over'
};

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  animations: [
    trigger('accordion', [
      state('expand', style({
        overflow: 'hidden',
        height: '*'
      })),
      state('collapse', style({
        overflow: 'hidden',
        height: 0
      })),
      transition('expand <=> collapse', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavigationComponent implements OnInit, OnChanges, OnDestroy {

  appName: string;
  brandLetter: string;
  currentBaseRoute: string;
  menuItemSearchQuery: string;
  menuLinks: Array<NavigationItemModel>;
  menuLinksFlat: Array<NavigationItemModel>;
  visibleMenuLinks: Array<NavigationItemModel>;
  navLockedOpen: boolean;
  searchFocused: boolean;
  @Input() mainNav: MatDrawer;
  @Input() navClosed: boolean;
  @Input() navHovered: boolean;
  @Output() showNavLockAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sideNavMode: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('navigationItemSearchInput') navigationItemSearchInput: ElementRef;
  _sideNavMode: string;

  private breakpointObserverSubscription: Subscription;
  private navigationServiceLockedOpenSubscription: Subscription;
  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private navigationService: NavigationService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.appName = 'Springboard';
    this.brandLetter = this.appName.slice(0, 1);

    iconRegistry.addSvgIcon(
      'drag',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/drag.svg')
    );

    this.breakpointObserverSubscription = breakpointObserver.observe([
      `(min-width: ${navigationBreakpoints.medium}px)`
    ]).subscribe(result => {
      this.showNavLockAction.emit(result.matches);
      if (result.matches) {
        this._sideNavMode = sideNavModes.side;
      } else {
        this._sideNavMode = sideNavModes.over;
      }
      this.sideNavMode.emit(this._sideNavMode);
    });
  }

  ngOnInit() {
    this.menuLinks = this.navigationService.getMenuLinks();
    this.menuLinksFlat = this.navigationService.getMenuLinks(true);
    this.visibleMenuLinks = this.menuLinks;

    this.navLockedOpen = this.navigationService.isLocked();

    this.navigationServiceLockedOpenSubscription = this.navigationService.lockedOpen.subscribe(lockedOpen => {
      this.navLockedOpen = lockedOpen;
    });

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentBaseRoute = this.navigationService.getParentRoutePath(event);

      for (let i = 0, len = this.visibleMenuLinks.length; i < len; i++) {
        if (
          this.visibleMenuLinks[i].displayChildrenAs === 'ACCORDION' &&
          this.visibleMenuLinks[i].children &&
          this.visibleMenuLinks[i].path === this.currentBaseRoute
        ) {
          this.visibleMenuLinks[i].expanded = true;
          break;
        }
      }
    });
  }

  clearMenuSearch() {
    this.menuItemSearchQuery = void(0);
    this.updateVisibleMenuItems(this.menuItemSearchQuery);
  }

  closeMenu() {
    if (this._sideNavMode === 'over') {
      this.mainNav.close();
    }
  }

  drop(event: CdkDragDrop<object[]>) {
    moveItemInArray(this.visibleMenuLinks, event.previousIndex, event.currentIndex);
    this.navigationService.setMenuItemPositions(this.visibleMenuLinks);
  }

  toggleChildLinksVisibility(link) {
    if (link.children) {
      link.expanded = !link.expanded;
    }
  }

  updateVisibleMenuItems(query) {
    let links: Array<NavigationItemModel>;

    if (query && query.trim()) {
      links = this.menuLinksFlat.filter(link => {
        return link.title.toLowerCase().indexOf(query.trim().toLowerCase()) > -1;
      });
    } else {
      links = this.menuLinks;
    }
    this.visibleMenuLinks = links;
  }

  toggleMenuLock() {
    this.navLockedOpen = this.navigationService.toggleLock();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.navClosed ||
      (this._sideNavMode !== sideNavModes.over && !this.navLockedOpen && changes.navHovered && !changes.navHovered.currentValue)) {
      this.resetNavigationSearchInput();
    }
  }

  ngOnDestroy(): void {
    this.breakpointObserverSubscription.unsubscribe();
    this.navigationServiceLockedOpenSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  private resetNavigationSearchInput() {
    this.clearMenuSearch();
    this.navigationItemSearchInput.nativeElement.blur();
  }
}
