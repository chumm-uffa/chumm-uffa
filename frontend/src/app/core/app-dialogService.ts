import {Injectable} from '@angular/core';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {GoogleMapsComponent} from '../google-maps/google-maps.component';
import {SpinnerComponent} from '../material/spinner/spinner.component';

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

  showGoogleMaps(lat: number, lng: number, isEditable: boolean = true) {
    const dialogRef = this.dialog.open(GoogleMapsComponent,
      {
        height: '80vh',
        width: '80vw',
        disableClose: true,
        data: {longitude: lng, latitude: lat, editable: isEditable}
      });

    return dialogRef.afterClosed();
  }

  showSpinner(): MatDialogRef<SpinnerComponent> {
    const dialogRef = this.dialog.open(SpinnerComponent,
      {height: '180px', width: '180px', disableClose: true, panelClass: 'app-spinner-panel'});
    return dialogRef;
  }
}
