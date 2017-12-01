import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ValidationFeedbackComponent} from './validation-feedback/validation-feedback.component';
import {HasErrorPipe, HasSomeErrorPipe} from './pipes/error';
import {DateFormatPipe, DateTimeFormatPipe} from './pipes/date';

@NgModule({
  declarations: [
    ValidationFeedbackComponent, HasErrorPipe, HasSomeErrorPipe, DateFormatPipe, DateTimeFormatPipe
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ValidationFeedbackComponent, HasErrorPipe, HasSomeErrorPipe, DateFormatPipe, DateTimeFormatPipe
  ],
  providers: []
})
export class SharedModule {
}
