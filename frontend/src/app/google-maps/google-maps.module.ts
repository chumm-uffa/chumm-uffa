import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsComponent } from './google-maps.component';
import { AgmCoreModule } from '@agm/core';
import {MaterialModule} from '../material/material.module';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCTM5Clf98ZFVp-ToUFJQJ3zmZRdVpX4KE'
    })
  ],
  entryComponents: [GoogleMapsComponent],
  declarations: [GoogleMapsComponent]
})
export class GoogleMapsModule { }
