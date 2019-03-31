import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.scss']
})
export class TaskDetailsDialogComponent implements OnInit {

  @ViewChild('dialogContent') dialogContent: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;
  taskId: string;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.taskId = this.route.snapshot.paramMap.get('taskId');
  }

  ngOnInit() {
    Promise.resolve().then(() => {
      this.dialogRef = this.dialog.open(this.dialogContent, {
        panelClass: 'task-details-dialog'
      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['../'], {
          relativeTo: this.route
        });
      });
    });
  }

  taskDeleted() {
    this.dialogRef.close();
  }
}
