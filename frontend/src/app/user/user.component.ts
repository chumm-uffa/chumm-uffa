import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validatePwdsMatch} from '../shared/validators/password-match.validator';
import {User} from '../core/model/user';
import {FormUtil} from '../shared/form/form.util';
import {AppStateService} from '../core/app-state.service';

@Component({
  selector: 'app-registration',
  templateUrl: './user.html'
})
export class UserComponent implements OnInit {

  loginForm: FormGroup;
  private user: User;

  constructor( private fB: FormBuilder,
               private appState: AppStateService) {
    if ( appState.isLoggedIn ) {
      this.user = appState.loggedInUser;
    }else {
      this.user = new User();
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fB.group({
      username: [this.user.username, [Validators.required, Validators.minLength(2)]], // Field , Fieldvalidators
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: '',
      sex: this.user.sex,
      email: [this.user.email, [Validators.email]]
    }, {
      validator: validatePwdsMatch('password', 'password2')  // Formvalidators -> validate between Fields
    });
  }

  onClickRegister() {
    FormUtil.markAsTouched(this.loginForm);  // macht Validierungsfehler sichtbar
    if (this.loginForm.valid && !this.loginForm.pending) {  // Form ist gültig und die Validierung ist abgeschlossen
      console.log('form value', this.loginForm.value);
      console.log('send data to Service');
      const fb = this.loginForm.value;
      this.appState.loggedInUser = new User(fb.username, fb.password, fb.sex, fb.email);
    }else {
      console.log('form invald', this.loginForm.errors);
      console.log('form invald', this.loginForm.hasError('passwordMismatch'));
    }
  }


}
