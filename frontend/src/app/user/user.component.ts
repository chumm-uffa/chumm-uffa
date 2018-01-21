import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormUtil} from '../shared/form/form.util';
import {AppStateService} from '../core/app-state.service';
import {UserFormService} from './form/user-form.service';
import {BusinessService} from '../core/business.service';

import {MatDialog} from '@angular/material';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';
import {User, Sex} from '@chumm-uffa/interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './user.html'
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  sexType = Sex;
  private user: User;

  constructor(private userFormService: UserFormService,
              private appState: AppStateService,
              private businessService: BusinessService,
              private router: Router,
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
        this.businessService.saveUser(this.userFormService.mergeUser(this.userForm.value, this.user))
        .subscribe(() => {
          this.dialog.open(InfoPopupComponent, {data: {infoText: '', infoTitle: 'user.dialog.updateSuccessfulTitle'}});
        }, err => {
          this.dialog.open(InfoPopupComponent, {data: {infoText: err, infoTitle: 'user.dialog.updateFailedTitle'}});
          this.userForm.hasError(err);
        });
      } else {
        this.businessService.register(this.userFormService.mergeUser(this.userForm.value, this.user))
        .subscribe(() => {
          const myDialog = this.dialog.open(InfoPopupComponent,
            {data: {infoText: '', infoTitle: 'user.dialog.registrationSuccessfulTitle'}});
          myDialog.afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        }, err => {
          this.dialog.open(InfoPopupComponent, {data: {infoText: err, infoTitle: 'user.dialog.registrationFailedTitle'}});
          this.userForm.hasError(err);
        });
      }
    }
  }
}
