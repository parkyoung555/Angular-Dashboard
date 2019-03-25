import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../core/navigation/services/navigation.service';
import {NavigationItemModel} from '../../core/navigation/models/navigation-item.model';
import {CreateTaskDialogComponent} from '../components/create-task-dialog/create-task-dialog.component';
import {MatDialog, MatIconRegistry, MatSnackBar} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  inlineNavLinks: Array<NavigationItemModel>;

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'priority_high',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/chevron-double-up.svg')
    );

    this.iconRegistry.addSvgIcon(
      'priority_critical',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/chevron-triple-up.svg')
    );

    iconRegistry.addSvgIcon(
      'drag',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/drag.svg')
    );
  }

  ngOnInit() {
    this.inlineNavLinks = this.navigationService.getChildMenuLinks(this.route.snapshot.url[0].path);
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: `${8 * 60}px`
    });
    dialogRef.afterClosed().subscribe(task => {
      if (task) {
        this.snackBar.open('Task created.', 'Ok');
      }
    });
  }
}
