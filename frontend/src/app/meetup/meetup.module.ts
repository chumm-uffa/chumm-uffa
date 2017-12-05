import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupComponent } from './meetup.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CommonModule, TranslateModule, ReactiveFormsModule, CoreModule
  ],
  declarations: [MeetupComponent]
})
export class MeetupModule { }
