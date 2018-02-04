import { NgModule } from '@angular/core';
import {LoginComponent} from './login.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginFormService} from './form/login-form.service';
import {MaterialModule} from '../material/material.module';



@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    TranslateModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginFormService]
})
export class LoginModule { }
