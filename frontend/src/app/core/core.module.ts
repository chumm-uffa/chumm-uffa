import { NgModule } from '@angular/core';
import {ResourceService} from "./resource.service";
import {BusinessService} from "./business.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports:   [
    HttpClientModule

  ],
  providers: [
    ResourceService, BusinessService
  ]
})
export class CoreModule {


}
