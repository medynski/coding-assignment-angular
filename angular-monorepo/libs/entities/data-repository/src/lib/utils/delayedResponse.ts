import { HttpErrorResponse } from '@angular/common/http';
import { delay, map, MonoTypeOperatorFunction, pipe } from 'rxjs';

export function delayedResponse<T>(
  delayMs = 10, // @todo: change to 1000 after development (change related to task requirements)
  failureRate = 0.1,
): MonoTypeOperatorFunction<T> {
  return pipe(
    delay(delayMs),
    map((value) => {
      if (Math.random() <= failureRate) {
        throw new HttpErrorResponse({ status: 403 });
      }
      return value;
    }),
  );
}
