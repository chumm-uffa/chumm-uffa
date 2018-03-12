import {NgModule} from '@angular/core';
import {ResourceService} from './services/resource.service';
import {BusinessService} from './services/business.service';
import {HttpClientModule} from '@angular/common/http';
import {AppStateService} from './services/app-state.service';
import {MockService} from './services/mock.service';
import {MaterialModule} from '../material/material.module';
import {AppDialogService} from './services/app-dialog.service';
import {GoogleMapsModule} from '../google-maps/google-maps.module';
import {NotificationService} from './services/notification.service';

@NgModule({
  imports: [
    HttpClientModule, MaterialModule, GoogleMapsModule

  ],
  providers: [
    ResourceService,
    NotificationService,
    BusinessService,
    AppStateService,
    MockService,
    AppDialogService
  ]
})
export class CoreModule {


}
