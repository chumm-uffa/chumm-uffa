import {FormControl, ValidatorFn} from '@angular/forms';
import {Validation} from './validation';

export function validateOneOf(...cut): ValidatorFn {
  return ((c: FormControl): { [key: string]: any } => {

    if (!cut.some(str => c.get(str).value)) {
      const error = 'oneOfAll';
      cut.forEach(str => c.get(str).setErrors([error]))
      return Validation.getInvalidObject(error); // validation failed
    }
    return null; // validation OK
  });
}
