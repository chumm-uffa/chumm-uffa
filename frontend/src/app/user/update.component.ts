import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormUtil} from '../shared/form/form.util';
import {AppStateService} from '../core/app-state.service';
import {UserFormService} from './form/user-form.service';
import {BusinessService} from '../core/business.service';

import {MatDialog} from '@angular/material';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';
import {Sex, User} from '@chumm-uffa/interface';

@Component({
  selector: 'app-update-user',
  templateUrl: './update.html',
  styleUrls: ['./user.scss']
})
export class UpdateComponent implements OnInit {

  userForm: FormGroup;
  passwordForm: FormGroup;
  sexType = Sex;
  private user: User;

  constructor(private userFormService: UserFormService,
              private appState: AppStateService,
              private businessService: BusinessService,
              private dialog: MatDialog) {

    this.user = appState.loggedInUser;
  }

  ngOnInit(): void {
    this.userForm = this.userFormService.createUpdateForm(this.user);
    this.passwordForm = this.userFormService.createPasswordForm(this.user);
  }

  onClickRegister() {
    FormUtil.markAsTouched(this.userForm);  // macht Validierungsfehler sichtbar
    if (this.userForm.valid && !this.userForm.pending) {  // Form ist gültig und die Validierung ist abgeschlossen
      this.businessService.saveUser(this.userFormService.mergeUser(this.userForm.value, this.user))
        .subscribe(() => {
          this.dialog.open(InfoPopupComponent, {
            data: {
              infoText: '',
              infoTitle: 'user.dialog.updateSuccessfulTitle'
            }
          });
        }, err => {
          this.dialog.open(InfoPopupComponent, {data: {infoText: err, infoTitle: 'user.dialog.updateFailedTitle'}});
          this.userForm.hasError(err);
        });
    }
  }

  onChangePassword() {
    // todo
  }
}
