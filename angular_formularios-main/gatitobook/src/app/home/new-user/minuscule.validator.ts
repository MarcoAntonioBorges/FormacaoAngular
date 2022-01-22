import { AbstractControl } from "@angular/forms";

export function minusculeValidator(control: AbstractControl): any {
  const value = control.value as string;
  if (value !== value.toLowerCase()) {
    return {
      minuscule: true,
    }
  } else {
    return null
  }
}
