import { Nullable } from '@angular-monorepo/entities/data-repository';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchFieldsValidator(
  field1: string,
  field2: string,
): ValidatorFn {
  return (formGroup: AbstractControl): Nullable<ValidationErrors> => {
    const control1 = formGroup.get(field1);
    const control2 = formGroup.get(field2);

    if (control1?.value === control2?.value) {
      return { fieldsMatch: true };
    }

    return null;
  };
}
