import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formErrors',
  standalone: true
})
export class FormErrorsPipe implements PipeTransform {

  transform(value: string, arg: unknown): unknown {
    switch (value) {
      case 'required':
        return 'This field is required';
      case 'email':
        return 'Email is invalid';
      case 'minlength':
        const requiredLength = (arg as { requiredLength: number }).requiredLength;
        return `At least ${ requiredLength } characters required`;
      case 'passwordMismatch':
        return 'Passwords do not match';
    }
    return null;
  }
}
