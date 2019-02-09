import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {NavigationService} from '../../services/navigation.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {NavigationItemModel} from '../../models/navigation-item.model';

const navigationBreakpoints = {
  large: 1400,
  medium: 960
};

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit, OnDestroy {

  appName: string;
  brandLetter: string;
  menuLinks: Array<NavigationItemModel>;
  navLockedOpen: boolean;
  @Output() showNavLockAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sideNavMode: EventEmitter<string> = new EventEmitter<string>();

  private breakpointObserverSubscription: Subscription;
  private navigationServiceLockedOpenSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navigationService: NavigationService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {
    this.appName = 'Spring Board';
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
        this.sideNavMode.emit('side');
      } else {
        this.sideNavMode.emit('over');
      }
    });
  }

  ngOnInit() {
    this.menuLinks = this.navigationService.getMenuLinks();

    this.navLockedOpen = this.navigationService.isLocked();

    this.navigationServiceLockedOpenSubscription = this.navigationService.lockedOpen.subscribe(lockedOpen => {
      this.navLockedOpen = lockedOpen;
    });
  }

  drop(event: CdkDragDrop<object[]>) {
    moveItemInArray(this.menuLinks, event.previousIndex, event.currentIndex);
  }

  toggleMenuLock() {
    this.navLockedOpen = this.navigationService.toggleLock();
  }

  ngOnDestroy(): void {
    this.breakpointObserverSubscription.unsubscribe();
    this.navigationServiceLockedOpenSubscription.unsubscribe();
  }
}
