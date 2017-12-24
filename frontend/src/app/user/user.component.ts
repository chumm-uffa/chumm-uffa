import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validatePwdsMatch} from '../shared/validators/password-match.validator';
import {FormUtil} from '../shared/form/form.util';
import {AppStateService} from '../core/app-state.service';
import {UserFormService} from './form/user-form.service';
import {BusinessService} from '../core/business.service';

import {createRegisterRequest, IRegisterRequest, User} from '@chumm-uffa/interface';

@Component({
  selector: 'app-registration',
  templateUrl: './user.html'
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  private user: User;

  constructor( private userFormService: UserFormService,
               private appState: AppStateService,
               private businessService: BusinessService) {
    if ( appState.isLoggedIn ) {
      this.user = appState.loggedInUser;
    }else {
      this.user = new User();
    }
  }

  ngOnInit(): void {
    this.userForm = this.userFormService.createForm(this.user);
  }

  onClickRegister() {
    FormUtil.markAsTouched(this.userForm);  // macht Validierungsfehler sichtbar
    if (this.userForm.valid && !this.userForm.pending) {  // Form ist gültig und die Validierung ist abgeschlossen
      console.log('form value', this.userForm.value);
      console.log('send data to Service');
      this.businessService.register(createRegisterRequest(this.userFormService.createUser())).subscribe( response => {
        console.log('New DBUser register with id ', response.id);
      }, err =>  {
        const response: IRegisterRequest = err.error;
        console.log('register failed, ', response.message);
        this.userForm.hasError(response.message);
      });

    }else {
      console.log('form invald', this.userForm.errors);
      console.log('form invald', this.userForm.hasError('passwordMismatch'));
    }
  }


}
