import {FormControl, ValidatorFn} from '@angular/forms';
import {Validation} from './validation';

export function validateOneOf(... cut): ValidatorFn {
  return ((c: FormControl): { [key: string]: any } => {

    if (! cut.some(str => c.get(str).value)) {
      return Validation.getInvalidObject('oneOfAll'); // validation failed
    }
    return null; // validation OK
  });
}
