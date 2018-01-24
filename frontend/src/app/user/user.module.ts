import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {UserFormService} from './form/user-form.service';
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
    UserComponent
  ],
  providers: [UserFormService]
})
export class RegistrationModule {
}
