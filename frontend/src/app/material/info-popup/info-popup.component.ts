import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.html',
  styleUrls: ['../styles/dialog.component.scss']
})
export class InfoPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<InfoPopupComponent>) { }

}
