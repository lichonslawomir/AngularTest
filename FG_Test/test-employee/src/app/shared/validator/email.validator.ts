import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[validateEmail][ngModel],[validateEmail][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
  ]
})
export class EmailValidator {

  validator: Function

  constructor() {
    this.validator = this.validateEmailFactory()
  }

  validate(control: FormControl) {
    return this.validator(control)
  }

  validateEmailFactory() {
    return (control: FormControl) => {
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      return EMAIL_REGEXP.test(control.value) ? null : {
        validateEmail: {
          message: "Invalid email address"
        }
      }
    }
  }

}
