import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validatePwdsMatch} from '../shared/validators/password-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit{


  loginForm: FormGroup;

  constructor( private fB: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fB.group({
      username: ['name', [Validators.required, Validators.minLength(2)]], // Field , Fieldvalidators
      password: ['pwd', [Validators.required, Validators.minLength(8)]],
      password2: ['pwd2', [Validators.required, Validators.minLength(8)]],
      sex: 'm',
      email: ['myMail@dot.ch', [Validators.email]]
    }, {
      validator: validatePwdsMatch('password', 'password2')  // Formvalidators -> validate between Fields
    });
  }

  onClickRegister() {
    if (this.loginForm.valid && !this.loginForm.pending) {  // Form ist gültig und die Validierung ist abgeschlossen
      console.log('form value', this.loginForm.value);
      console.log('send data to Service');
    }else {
      console.log('form invald', this.loginForm.errors);
      console.log('form invald', this.loginForm.hasError('passwordMismatch'));
    }
  }


}
