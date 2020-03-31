import { cold } from 'jest-marbles';
import { filter } from 'rxjs/operators';

describe('Filtering - filter', () => {
  it('filter', () => {
    const source$ = cold('---a-b-c', { a: 1, b: 2, c: 3 });
    const stream$ = source$.pipe(filter((value) => value === 2));
    const expected$ = cold('-----b--', { b: 2 });

    expect(stream$).toBeObservable(expected$);
  });
});
