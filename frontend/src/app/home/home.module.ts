import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {CoreModule} from '../core/core.module';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({

  declarations: [
    HomeComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    TranslateModule
  ]
})
export class HomeModule {
}
