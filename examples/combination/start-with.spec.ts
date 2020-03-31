import { cold } from 'jest-marbles';
import { startWith } from 'rxjs/operators';

describe('Combination - startWith', () => {
  it('startWith', () => {
    const a$ = cold('---a-b-c--');
    const stream$ = a$.pipe(startWith('d'));
    const expected$ = cold('d--a-b-c--');

    expect(stream$).toBeObservable(expected$);
  });
});
