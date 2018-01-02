import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AppStateService} from '../core/app-state.service';
import {BusinessService} from '../core/business.service';
import {LoginFormService} from './form/login-form.service';
import {FormUtil} from '../shared/form/form.util';
import {ILoginResponse} from '@chumm-uffa/interface';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit  {

  loginForm: FormGroup;

  constructor( private loginFormService: LoginFormService,
               private appState: AppStateService,
               private businessService: BusinessService,
               private router: Router,
               private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loginForm = this.loginFormService.createForm();
  }

  onClickLogin() {
    FormUtil.markAsTouched(this.loginForm);  // macht Validierungsfehler sichtbar
    if (this.loginForm.valid && !this.loginForm.pending) {  // Form ist gültig und die Validierung ist abgeschlossen
      this.businessService.login(this.loginFormService.createUser()).subscribe( response => {
        this.appState.loggedInUser = response.profile;
        this.appState.token = response.token;
        this.router.navigate(['/mymeetups']);
      }, err =>  {
        const response: ILoginResponse = err.error;
        console.log('Error while login, ', response.message);
        this.dialog.open(InfoPopupComponent, {data: {infoText: response.message, infoTitle: 'login.dialog.errorTitle'}});
        this.loginForm.hasError(response.message);
      });
    }else {
      console.log('form invald', this.loginForm.errors);
    }
  }

}
