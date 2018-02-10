import {NgModule} from '@angular/core';
import {ResourceService} from './resource.service';
import {BusinessService} from './business.service';
import {HttpClientModule} from '@angular/common/http';
import {AppStateService} from './app-state.service';
import {MockService} from './mock.service';
import {AuthGuard} from './AuthGuard';
import {MaterialModule} from '../material/material.module';
import {AppDialogService} from './AppDialogService';
import {GoogleMapsModule} from '../google-maps/google-maps.module';

@NgModule({
  imports: [
    HttpClientModule, MaterialModule, GoogleMapsModule

  ],
  providers: [
    ResourceService,
    BusinessService,
    AppStateService,
    MockService,
    AuthGuard,
    AppDialogService
  ]
})
export class CoreModule {


}
