import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validatePwdsMatch} from '../shared/validators/password-match.validator';
import {User} from './user';
import {FormUtil} from '../shared/form/form.util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html'
})
export class RegistrationComponent implements OnInit {

  loginForm: FormGroup;
  private user: User;

  constructor( private fB: FormBuilder) {
    // if (/*logged in*/ true ){
    //   /*get Data from Service*/
    //   this.user = ;
    // }else {
      this.user = new User();
    // }
  }

  ngOnInit(): void {
    this.loginForm = this.fB.group({
      username: [this.user.username, [Validators.required, Validators.minLength(2)]], // Field , Fieldvalidators
      password: ['', [Validators.required, Validators.minLength(8)]],
§§      password2: '',
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
    }else {
      console.log('form invald', this.loginForm.errors);
      console.log('form invald', this.loginForm.hasError('passwordMismatch'));
    }
  }


}
