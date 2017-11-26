import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ValidationFeedbackComponent} from './validation-feedback/validation-feedback.component';

@NgModule({
  declarations: [
    ValidationFeedbackComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ValidationFeedbackComponent
  ],
  providers: []
})
export class SharedModule {
}
