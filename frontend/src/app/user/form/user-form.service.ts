import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@chumm-uffa/interface';

import {validatePwdsMatch} from '../../shared/validators/password-match.validator';

@Injectable()
export class UserFormService {

  userForm: FormGroup;

  constructor(private fB: FormBuilder) {
  }

  public createForm(user: User): FormGroup {
    this.userForm = this.fB.group({
      username: [user.username, [Validators.required, Validators.minLength(2)]], // Field , Fieldvalidators
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordRepeat: '',
      sex: [user.sex, [Validators.required]],
      email: [user.email, [Validators.email]],
      weight: [user.weight]
    }, {
      validator: validatePwdsMatch('password', 'passwordRepeat')  // Formvalidators -> validate between Fields
    });
    return this.userForm;
  }

  public createUser(): User {
    const user: User = new User();
    user.username = this.userForm.value.username;
    user.password = this.userForm.value.password;
    user.email = this.userForm.value.email;
    user.sex = this.userForm.value.sex;
    user.weight = this.userForm.value.weight;
    return user;
  }
}
