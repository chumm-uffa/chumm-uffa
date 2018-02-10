import {FormControl, ValidatorFn} from '@angular/forms';
import {Validation} from './validation';
import {LocationType} from '@chumm-uffa/interface';

export function locationRequired(indoor: string, outdoor: string, locationType: string): ValidatorFn {
  return ((c: FormControl): { [key: string]: any } => {
    const error = 'required';

    switch (c.get(locationType).value) {
      case LocationType.INDOOR:
        if (!c.get(indoor).value) {
          return Validation.getInvalidObject(error); // validation failed
        }
        break;
      case LocationType.OUTDOOR:
        if (!c.get(outdoor).value) {
          return Validation.getInvalidObject(error); // validation failed
        }
        break;
    }
    return null; // validation OK
  });
}
