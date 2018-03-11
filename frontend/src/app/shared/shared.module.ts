import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HasErrorPipe, HasSomeErrorPipe} from './pipes/error';
import {DateFormatPipe, DateTimeFormatPipe, TimeFormatPipe} from './pipes/date';

@NgModule({
  declarations: [
    HasErrorPipe,
    HasSomeErrorPipe,
    DateFormatPipe,
    DateTimeFormatPipe,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    HasErrorPipe,
    HasSomeErrorPipe,
    DateFormatPipe,
    DateTimeFormatPipe,
    TimeFormatPipe
  ],
  providers: []
})
export class SharedModule {
}
