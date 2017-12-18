import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ValidationFeedbackComponent} from './validation-feedback/validation-feedback.component';
import {HasErrorPipe, HasSomeErrorPipe} from './pipes/error';
import {DateFormatPipe, DateTimeFormatPipe, TimeFormatPipe} from './pipes/date';

@NgModule({
  declarations: [
    ValidationFeedbackComponent,
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
    ValidationFeedbackComponent,
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
