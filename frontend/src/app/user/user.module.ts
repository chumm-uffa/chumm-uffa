import {NgModule} from '@angular/core';
import {UpdateComponent} from './update/update.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {UserFormService} from './form/user-form.service';
import {MaterialModule} from '../material/material.module';
import {RegistrationComponent} from './registration/registration.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    TranslateModule,
    MaterialModule
  ],
  declarations: [
    UpdateComponent,
    RegistrationComponent
  ],
  providers: [UserFormService]
})
export class RegistrationModule {
}
