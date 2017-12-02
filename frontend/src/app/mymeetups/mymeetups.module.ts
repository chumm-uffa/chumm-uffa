import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MymeetupsComponent } from './mymeetups.component';
import { OwnMeetupsComponent } from './own-meetups/own-meetups.component';
import { OpenRequestsComponent } from './open-requests/open-requests.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, SharedModule
  ],
  declarations: [MymeetupsComponent, OwnMeetupsComponent, OpenRequestsComponent]
})
export class MymeetupsModule { }
