import {
  EntityService,
  Nullable,
} from '@angular-monorepo/entities/data-repository';
import { Signal } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export function nameValidator(
  entityService: EntityService,
  initialName: Signal<string>,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<Nullable<ValidationErrors>> => {
    const name = control.value;

    if (!name || name === initialName()) {
      return of(null);
    }

    return entityService.getEntityList({ name }).pipe(
      map((entityDetails) => {
        return entityDetails.length === 0
          ? null
          : { entityAlreadyExists: true };
      }),
      catchError(() => {
        return of({ entityAlreadyExists: true });
      }),
    );
  };
}
