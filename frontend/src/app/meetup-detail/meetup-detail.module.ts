import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {MeetupDetailComponent} from './meetup-detail.component';
import {ParticipantComponent} from './participant/participant.component';
import {ChatComponent} from './chat/chat.component';
import {MaterialModule} from '../material/material.module';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    MeetupDetailComponent,
    ParticipantComponent,
    ChatComponent]
})
export class MeetupDetailModule {
}
