import { NgModule } from '@angular/core';
import {ResourceService} from "./resource.service";
import {BusinessService} from "./business.service";

@NgModule({
  imports:   [

  ],
  providers: [
    ResourceService, BusinessService
  ]
})
export class CoreModule {


}
