import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupComponent } from './meetup.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {MeetupFormService} from './form/meetup-form.service';

@NgModule({
  imports: [
    CommonModule, TranslateModule, ReactiveFormsModule, CoreModule, SharedModule
  ],
  declarations: [MeetupComponent],
  providers: [MeetupFormService]
})
export class MeetupModule { }
