import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ValidationFeedbackComponent} from './validation-feedback/validation-feedback.component';
import {HasErrorPipe, HasSomeErrorPipe} from './pipes/error';

@NgModule({
  declarations: [
    ValidationFeedbackComponent, HasErrorPipe, HasSomeErrorPipe
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ValidationFeedbackComponent, HasErrorPipe, HasSomeErrorPipe
  ],
  providers: []
})
export class SharedModule {
}
