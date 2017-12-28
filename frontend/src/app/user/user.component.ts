import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormUtil} from '../shared/form/form.util';
import {AppStateService} from '../core/app-state.service';
import {UserFormService} from './form/user-form.service';
import {BusinessService} from '../core/business.service';

import {IRegisterRequest, User} from '@chumm-uffa/interface';

@Component({
  selector: 'app-registration',
  templateUrl: './user.html'
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  private user: User;

  constructor(private userFormService: UserFormService,
              private appState: AppStateService,
              private businessService: BusinessService) {
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
          console.log('user profile updated with id ', response.profile.id);
        }, err => {
          const response: IRegisterRequest = err.error;
          console.log('user profile update failed, ', response.message);
          window.alert('user profile udate failed, ' + response.message);
          this.userForm.hasError(response.message);
        });
      } else {
        this.businessService.register(this.userFormService.mergeUser(this.userForm.value, this.user))
          .subscribe(response => {
            console.log('New user register with id ', response.id);
          }, err => {
            const response: IRegisterRequest = err.error;
            console.log('Register failed, ', response.message);
            window.alert('Register failed, ' + response.message);
            this.userForm.hasError(response.message);
          });
      }
    }
  }
}
