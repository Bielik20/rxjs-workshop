import { cold } from 'jest-marbles';
import { combineLatest } from 'rxjs';

describe('Combination - combineLatest', () => {
  it('combineLatest', () => {
    const a$ = cold(       '---a-b-c--');
    const b$ = cold(       '-d-----e--');
    const expected$ = cold('---f-g-(hi)--', {
      f: ['a', 'd'],
      g: ['b', 'd'],
      h: ['c', 'd'],
      i: ['c', 'e'],
    });
    const stream$ = combineLatest([a$, b$]);

    expect(stream$).toBeObservable(expected$);
  });
});
