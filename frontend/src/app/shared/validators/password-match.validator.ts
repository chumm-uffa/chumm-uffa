import {FormControl, ValidatorFn} from '@angular/forms';
import {Validation} from './validation';

export function validatePwdsMatch(pwd: string, pwd2: string): ValidatorFn {
  return ((c: FormControl): { [key: string]: any } => {

    const pass = c.get(pwd).value;
    const pass2 = c.get(pwd2).value;

    if (pass !== pass2) {
      if (c.get(pwd2).touched) {
        c.get(pwd2).setErrors(['passwordMismatch']);
      }
      return Validation.getInvalidObject('passwordMismatch'); // validation failed
    }

    return null; // validation OK
  });
}
