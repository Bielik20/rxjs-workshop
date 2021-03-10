import { cold } from 'jest-marbles';
import { withLatestFrom } from 'rxjs/operators';

describe('Combination - withLatestFrom', () => {
  it('withLatestFrom', () => {
    const a$ = cold(       'a----b-c--');
    const b$ = cold(       '-d------e-');
    const expected$ = cold('-----f-g--', {
      f: ['b', 'd'],
      g: ['c', 'd'],
    });

    const stream$ = a$.pipe(withLatestFrom(b$));

    expect(stream$).toBeObservable(expected$);
  });
});
