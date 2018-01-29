import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  // zentrum Schweiz
  lat = 46.968737144635824;
  lng = 8.59278917312622;
  lat_marker = 0;
  lng_marker = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<GoogleMapsComponent>) {

    if (data.latitude) {
      this.lat = data.latitude;
      this.lat_marker = data.latitude;
    }

    if (data.longitude) {
      this.lng = data.longitude;
      this.lng_marker = data.longitude;
    }
  }

  ngOnInit() {
  }

  clickOnMap(event) {
    if (!this.data.showOnly) {
      this.lat_marker = event.coords.lat;
      this.lng_marker = event.coords.lng;
    }
    console.log(event);
  }

}
