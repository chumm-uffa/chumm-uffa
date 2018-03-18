import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BusinessService} from '../core/services/business.service';
import {LoginFormService} from './form/login-form.service';
import {FormUtil} from '../shared/form/form.util';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';
import {Subscription} from 'rxjs/Subscription';
import {MEETUP_DETAIL_URL} from '../app-routing-urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  private activateRouteSubscription: Subscription;
  private params: Params;

  constructor(private loginFormService: LoginFormService,
              private businessService: BusinessService,
              private router: Router,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loginForm = this.loginFormService.createForm();
    this.activateRouteSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.params = params;
    });
  }

  ngOnDestroy(): void {
    if (this.activateRouteSubscription) {
      this.activateRouteSubscription.unsubscribe();
    }
  }

  onClickLogin() {
    FormUtil.markAsTouched(this.loginForm);  // macht Validierungsfehler sichtbar
    if (this.loginForm.valid && !this.loginForm.pending) {  // Form ist gültig und die Validierung ist abgeschlossen
      this.businessService.login(this.loginFormService.createUser()).subscribe(() => {
        if (this.params['meetupId']) {
          this.router.navigate(['/' + MEETUP_DETAIL_URL], {queryParams: this.params});
        } else {
          this.router.navigate(['/mymeetups']);
        }
      }, err => {
        this.dialog.open(InfoPopupComponent, {data: {infoText: err, infoTitle: 'login.dialog.errorTitle'}});
      });
    } else {
      console.log('form invald', this.loginForm.errors);
    }
  }
}
