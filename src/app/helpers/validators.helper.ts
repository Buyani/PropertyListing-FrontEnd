import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export default class Validation {

  //email matcher validtaor
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {

        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }


//white space validator
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true }
    }
    return null;

  }
// empty space avlidator
  static emptySpaceValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === null) {
      return null;
    }
    if (control.value.startsWith(' ')) {
      return {
        'emptySpaceStart': { value: 'input can not start with empty space' }
      };
    }
    if (control.value.endsWith('  ')) {
      return {
        'emptySpaceStart': { value: 'only one empty space in between texts' }
      };
    }
    return null;
  }

}
