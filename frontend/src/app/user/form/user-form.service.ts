import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@chumm-uffa/interface';

import {validatePwdsMatch} from '../../shared/validators/password-match.validator';

@Injectable()
export class UserFormService {

  constructor(private fB: FormBuilder) {
  }

  public createForm(user: User): FormGroup {
    return this.fB.group({
      username: [user.username, [Validators.required, Validators.minLength(2)]], // Field , Fieldvalidators
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordRepeat: '',
      sex: [user.sex, [Validators.required]],
      email: [user.email, [Validators.email]],
      weight: [user.weight]
    }, {
      validator: validatePwdsMatch('password', 'passwordRepeat')  // Formvalidators -> validate between Fields
    });
  }

  public mergeUser(formvalue, user: User): User {
    user.username = formvalue.username;
    user.password = formvalue.password;
    user.email = formvalue.email;
    user.sex = formvalue.sex;
    user.weight = formvalue.weight;
    return user;
  }
}
