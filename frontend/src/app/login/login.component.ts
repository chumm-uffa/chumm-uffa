import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BusinessService} from '../core/business.service';
import {LoginFormService} from './form/login-form.service';
import {FormUtil} from '../shared/form/form.util';
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
      this.businessService.login(this.loginFormService.createUser()).subscribe( () => {
        this.router.navigate(['/mymeetups']);
      }, err => {
        this.dialog.open(InfoPopupComponent, {data: {infoText: err, infoTitle: 'login.dialog.errorTitle'}});
      });
    }else {
      console.log('form invald', this.loginForm.errors);
    }
  }
}
