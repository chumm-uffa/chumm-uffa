import {Injectable} from '@angular/core';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';
import {MatDialog} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class AppDialogService {

  constructor(private dialog: MatDialog) {
  }

  showError(message: string) {
    console.log('Error occured: ', message);
    const dialogRef = this.dialog.open(InfoPopupComponent,
      {data: {infoText: message, infoTitle: 'appDialogService.errorTitle'}});
  }


  showServerError(response: HttpErrorResponse) {
    const message = `status: ${response.status} /  message: ${response.error.message}`;
    console.log('Server Error occured: ', message);
    const dialogRef = this.dialog.open(InfoPopupComponent,
      {data: {infoText: message, infoTitle: 'appDialogService.serverErrorTitle'}});
  }
}
