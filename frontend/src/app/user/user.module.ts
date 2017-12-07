import { NgModule } from '@angular/core';
import {UserComponent} from './user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  imports: [
    ReactiveFormsModule, CommonModule, SharedModule, TranslateModule
  ],
  declarations: [
    UserComponent
  ]
})
export class RegistrationModule { }
