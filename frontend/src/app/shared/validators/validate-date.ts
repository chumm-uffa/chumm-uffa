import {FormControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Validation} from './validation';


export function validateDateFormat(format: string): ValidatorFn {
  return ((c: FormControl): { [key: string]: any } => {
    if (!moment(c.value, format).isValid()) {
      return Validation.getInvalidObject('dateformat'); // validation failed
    }
    return null; // validation OK
  });
}

export function validateDateRange(format: string, fromDate?: Moment): ValidatorFn {

  if (!fromDate) {
    fromDate = moment(format);
    fromDate.hour(0);
    fromDate.minute(0);
    fromDate.second(0);
  }

  return ((c: FormControl): { [key: string]: any } => {

    // todo : will noch nicht so recht
    console.log('formDAte ', fromDate);
    console.log('validate date ', moment(c.value, format))
    if (fromDate.isAfter(moment(c.value, format))) {
      return Validation.getInvalidObject('dateRange'); // validation failed
    }
    return null; // validation OK
  });
}

