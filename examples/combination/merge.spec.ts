import { cold } from 'jest-marbles';
import { merge } from 'rxjs';

describe('Combination - merge', () => {
  it('merge', () => {
    const a$ = cold(       '---a-b-c--');
    const b$ = cold(       '-d-----e--');
    const expected$ = cold('-d-a-b-(ce)--');

    const stream$ = merge(a$, b$);

    expect(stream$).toBeObservable(expected$);
  });
});
