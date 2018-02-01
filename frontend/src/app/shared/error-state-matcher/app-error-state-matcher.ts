import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';


/** Error when formroot has 'errorCode' or control is invalid.
 * In every case the control have to be touched or submitted. */
export class AppErrorStateMatcher implements ErrorStateMatcher {

  constructor(private errorCode: string) {
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (form.form.hasError(this.errorCode) || control.invalid) && (isSubmitted || control.touched);
  }
}
