import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class LoginFormService {

  constructor(private fB: FormBuilder) {
  }

  public createForm(): FormGroup {
    return this.fB.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
}
