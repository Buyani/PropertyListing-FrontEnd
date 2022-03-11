import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export default class Validation {


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



    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0){
            return {cannotContainSpace: true}
        }
        return null;

    }

    static emptySpaceValidator(control: AbstractControl) : ValidationErrors | null {
      if(control.value.startsWith(' ')){
        return {
          'emptySpaceStart': { value: 'input can not start with empty space' }
        };
      }
      if(control.value.endsWith('  ')){
        return {
          'emptySpaceStart': { value: 'only one empty space in between texts' }
        };
      }
      return null;
  }

}
