import { cold } from 'jest-marbles';
import { takeUntil } from 'rxjs/operators';

describe('Filtering - takeUntil', () => {
  it('takeUntil', () => {
    const source$ = cold(      '---a-b-c');
    const cancellation$ = cold('----b');
    const expected$ = cold(    '---a|');
    const stream$ = source$.pipe(takeUntil(cancellation$));

    expect(stream$).toBeObservable(expected$);
  });
});
