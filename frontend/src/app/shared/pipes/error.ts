import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl} from '@angular/forms';

/**
 * Filtert nach einem oder mehreren vorgegebenen Errorcode(s)
 */
@Pipe({name: 'hasError', pure: false})
export class HasErrorPipe implements PipeTransform {

  transform(input: AbstractControl, ...args: any[]): any {

    if (!input) {
      return false;
    }
    const hasAtLeastOneError = args.reduce((acc, errorCode) => acc || input.hasError(errorCode), false);
    if (hasAtLeastOneError && input.touched) {
      return true;
    }
    return false;
  }
}

/**
 * prüft auf Errors
 */
@Pipe({name: 'hasSomeError', pure: false})
export class HasSomeErrorPipe implements PipeTransform {

  transform(input: AbstractControl, ...args: any[]): any {

    if (!input) {
      return false;
    }

    if (input.errors && input.touched) {
      return true;
    }
    return false;
  }
}
