import { NgModule } from '@angular/core';
import {RegistrationComponent} from './registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  imports: [
    ReactiveFormsModule, CommonModule, SharedModule, TranslateModule
  ],
  declarations: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
