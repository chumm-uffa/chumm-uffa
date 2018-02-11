import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.html',
  styleUrls: ['../dialog.component.scss']
})
export class SpinnerComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<SpinnerComponent>) {
  }

}
