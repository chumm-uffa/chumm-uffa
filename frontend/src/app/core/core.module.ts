import {NgModule} from '@angular/core';
import {ResourceService} from './resource.service';
import {BusinessService} from './business.service';
import {HttpClientModule} from '@angular/common/http';
import {AppStateService} from './app-state.service';
import {MockService} from './mock.service';
import {AuthGuard} from './AuthGuard';

@NgModule({
  imports: [
    HttpClientModule

  ],
  providers: [
    ResourceService,
    BusinessService,
    AppStateService,
    MockService,
    AuthGuard
  ]
})
export class CoreModule {


}
