import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AppStateService} from '../core/app-state.service';
import {BusinessService} from '../core/business.service';
import {LoginFormService} from './form/login-form.service';
import {FormUtil} from '../shared/form/form.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit  {

  loginForm: FormGroup;

  constructor( private loginFormService: LoginFormService,
               private appState: AppStateService,
               private businessService: BusinessService) {
  }

  ngOnInit(): void {
    this.loginForm = this.loginFormService.createForm();
  }

  onClickLogin() {
    FormUtil.markAsTouched(this.loginForm);  // macht Validierungsfehler sichtbar
    if (this.loginForm.valid && !this.loginForm.pending) {  // Form ist gültig und die Validierung ist abgeschlossen
      console.log('form value', this.loginForm.value);
      console.log('send data to Service');
      if (this.businessService.login(this.loginForm.value.email, this.loginForm.value.password)){
        console.log('login successfully', this.loginForm.errors);
  //    appState.loggedInUser = {};
      }
    }else {
      console.log('form invald', this.loginForm.errors);
    }
  }

}
