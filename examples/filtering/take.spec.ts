import { cold } from 'jest-marbles';
import { take } from 'rxjs/operators';

describe('Filtering - take', () => {
  it('take', () => {
    const source$ = cold('---a-b-c');
    const stream$ = source$.pipe(take(2));
    const expected$ = cold('---a-(b|)');

    expect(stream$).toBeObservable(expected$);
  });
});
