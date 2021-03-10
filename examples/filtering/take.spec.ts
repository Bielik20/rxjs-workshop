import { cold } from 'jest-marbles';
import { take } from 'rxjs/operators';

describe('Filtering - take', () => {
  it('take', () => {
    const source$ = cold(  '---a-b-c');
    const expected$ = cold('---a-(b|)');

    const stream$ = source$.pipe(take(2));

    expect(stream$).toBeObservable(expected$);
  });
});
