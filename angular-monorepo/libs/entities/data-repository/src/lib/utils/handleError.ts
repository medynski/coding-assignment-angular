import { catchError, Observable, of, OperatorFunction } from 'rxjs';

export function handleError<T>(defaultValue: T): OperatorFunction<T, T> {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(
      catchError<T, Observable<T>>((err) => {
        alert(`${err.status} | ${err.statusText}`);
        return of(defaultValue as T);
      }),
    );
}
