import {NgModule} from '@angular/core';
import {ResourceService} from './resource.service';
import {BusinessService} from './business.service';
import {HttpClientModule} from '@angular/common/http';
import {AppStateService} from './app-state.service';
import {MockService} from './mock.service';
import {AuthGuard} from './AuthGuard';
import {MaterialModule} from '../material/material.module';
import {AppDialogService} from './AppDialogService';

@NgModule({
  imports: [
    HttpClientModule, MaterialModule

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
