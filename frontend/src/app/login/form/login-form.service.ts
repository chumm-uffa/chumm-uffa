import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {User} from '@chumm-uffa/interface';

@Injectable()
export class LoginFormService {

  public loginForm: FormGroup;

  constructor(private fB: FormBuilder) {
  }

  public createForm(): FormGroup {
    this.loginForm = this.fB.group({
      username: ['', [Validators.required, Validators.minLength(2)]], // Field , Fieldvalidators
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    return this.loginForm;
  }

  public createUser(): User {
    const user: User = new User();
    user.username = this.loginForm.value.username;
    user.password = this.loginForm.value.password;
    return user;
  }
}
