import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {CoreModule} from '../core/core.module';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NewsTickerComponent} from './news-ticker/news-ticker.component';
import {MaterialModule} from '../material/material.module';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';


@NgModule({

  declarations: [
    HomeComponent,
    NewsTickerComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    TranslateModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ]
})
export class HomeModule {
}
