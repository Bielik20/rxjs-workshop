import { cold } from 'jest-marbles';
import { skip } from 'rxjs/operators';

describe('Filtering - skip', () => {
  it('skip', () => {
    const source$ = cold(  '---a-b-c');
    const expected$ = cold('-----b-c');
    const stream$ = source$.pipe(skip(1));

    expect(stream$).toBeObservable(expected$);
  });
});
