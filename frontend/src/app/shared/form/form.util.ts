import {AbstractControl, FormGroup} from '@angular/forms';

export class FormUtil {

  public static markAsTouched(form: AbstractControl) {
    form.markAsTouched();
    const fg = (form as FormGroup);
    if (fg.controls && Object.keys(fg.controls).length > 0) {
      for (const ctrl in fg.controls) {
        if (fg.controls.hasOwnProperty(ctrl)) {
          FormUtil.markAsTouched(fg.get(ctrl));
        }
      }
    }
  }
}
