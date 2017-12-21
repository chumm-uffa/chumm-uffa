import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AppStateService} from '../core/app-state.service';
import {BusinessService} from '../core/business.service';
import {LoginFormService} from './form/login-form.service';
import {FormUtil} from '../shared/form/form.util';
import {ILoginResponse, createLoginRequest} from '@pepe.black/chumm-uffa-interface';

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
      this.businessService.login(createLoginRequest(this.loginForm.value.email, this.loginForm.value.password)).subscribe( response => {
        this.appState.token = response.token;
        // TODO refactor, we must use only one model!!
//        this.appState.loggedInUser = response.user;
      }, err =>  {
        const response: ILoginResponse = err.error;
        console.log('error while login, ', response.message);
        this.loginForm.hasError(response.message);
      });
    }else {
      console.log('form invald', this.loginForm.errors);
    }
  }

}
