import { NgModule } from '@angular/core';
import {RegistrationComponent} from './registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';



@NgModule({
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  declarations: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
