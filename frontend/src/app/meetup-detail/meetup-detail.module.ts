import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {MeetupDetailComponent} from './meetup-detail.component';


@NgModule({
  imports: [
    CommonModule, TranslateModule, ReactiveFormsModule, CoreModule, SharedModule
  ],
  declarations: [MeetupDetailComponent]
})
export class MeetupDetailModule {
}
