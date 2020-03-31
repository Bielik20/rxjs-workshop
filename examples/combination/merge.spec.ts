import { cold } from 'jest-marbles';
import { merge } from 'rxjs';

describe('Combination - merge', () => {
  it('merge', () => {
    const a$ = cold('---a-b-c--');
    const b$ = cold('-d-----e--');
    const stream$ = merge(a$, b$);
    const expected$ = cold('-d-a-b-(ce)--');

    expect(stream$).toBeObservable(expected$);
  });
});
