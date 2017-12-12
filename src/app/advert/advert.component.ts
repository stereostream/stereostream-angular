import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-advert',
  template: '<ng-content></ng-content>',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements AfterViewInit {
  constructor(public dialog: MatDialog) { }

  ngAfterViewInit() {
    if (navigator.userAgent.toLowerCase().indexOf('android') > -1)
      this.dialog.open(AdvertDialogComponent);
  }
}

@Component({
  selector: 'app-advert-dialog-component',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertDialogComponent {
  constructor(public dialogRef: MatDialogRef<AdvertDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close() {

  }
}
