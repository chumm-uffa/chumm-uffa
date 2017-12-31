import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormUtil} from '../shared/form/form.util';
import {AppStateService} from '../core/app-state.service';
import {UserFormService} from './form/user-form.service';
import {BusinessService} from '../core/business.service';

import {createRegisterRequest, IRegisterRequest, User} from '@chumm-uffa/interface';
import {MatDialog} from '@angular/material';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';

@Component({
  selector: 'app-registration',
  templateUrl: './user.html'
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  private user: User;

  constructor(private userFormService: UserFormService,
              private appState: AppStateService,
              private businessService: BusinessService,
              private dialog: MatDialog) {
    if (appState.isLoggedIn) {
      this.user = appState.loggedInUser;
    } else {
      this.user = new User();
    }
  }

  ngOnInit(): void {
    this.userForm = this.userFormService.createForm(this.user);
  }

  onClickRegister() {
    FormUtil.markAsTouched(this.userForm);  // macht Validierungsfehler sichtbar
    if (this.userForm.valid && !this.userForm.pending) {  // Form ist gültig und die Validierung ist abgeschlossen

      if (this.appState.isLoggedIn) {
        this.businessService.saveUser(this.userFormService.mergeUser(this.userForm.value, this.user)).subscribe(response => {
          console.log('user updated with id ', response.id);
        }, err => {
          const response: IRegisterRequest = err.error;
          console.log('User update failed, ', response.message);
          this.dialog.open(InfoPopupComponent, {data: {infoText: response.message, infoTitle: 'user.dialog.updateFailedTitle'}});
          this.userForm.hasError(response.message);
        });
      } else {
        this.businessService.register(this.userFormService.mergeUser(this.userForm.value, this.user))
          .subscribe(response => {
            console.log('New DBUser register with id ', response.id);
          }, err => {
            const response: IRegisterRequest = err.error;
            console.log('Register failed, ', response.message);
            this.dialog.open(InfoPopupComponent, {data: {infoText: response.message, infoTitle: 'user.dialog.registrationFailedTitle'}});
            this.userForm.hasError(response.message);
          });
      }
    }
  }
}
