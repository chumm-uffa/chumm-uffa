import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validatePwdsMatch} from '../shared/validators/password-match.validator';
import {User} from '../core/model/user';
import {FormUtil} from '../shared/form/form.util';
import {AppStateService} from '../core/app-state.service';
import {UserFormService} from './form/user-form.service';
import {BusinessService} from '../core/business.service';

@Component({
  selector: 'app-registration',
  templateUrl: './user.html'
})
export class UserComponent implements OnInit {

  loginForm: FormGroup;
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
    this.loginForm = this.userFormService.createForm(this.user);
  }

  onClickRegister() {
    FormUtil.markAsTouched(this.loginForm);  // macht Validierungsfehler sichtbar
    if (this.loginForm.valid && !this.loginForm.pending) {  // Form ist gültig und die Validierung ist abgeschlossen
      console.log('form value', this.loginForm.value);
      console.log('send data to Service');
      const fb = this.loginForm.value;
      this.user = this.userFormService.mergeUser(this.loginForm.value, this.user);
      this.businessService.register(this.user);
    }else {
      console.log('form invald', this.loginForm.errors);
      console.log('form invald', this.loginForm.hasError('passwordMismatch'));
    }
  }


}
