import { cold } from 'jest-marbles';
import { map } from 'rxjs/operators';

describe('Transformation - map', () => {
  it('map', () => {
    const source$ = cold('---a-b-c');
    const stream$ = source$.pipe(map((value) => value.toString().toUpperCase()));
    const expected$ = cold('---A-B-C');

    expect(stream$).toBeObservable(expected$);
  });
});
