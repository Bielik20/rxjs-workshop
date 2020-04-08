import { cold } from 'jest-marbles';
import { map } from 'rxjs/operators';

describe('Transformation - map', () => {
  it('map', () => {
    const source$ = cold(  '---a-b-c');
    const expected$ = cold('---A-B-C');
    const stream$ = source$.pipe(map((value: string) => value.toUpperCase()));

    expect(stream$).toBeObservable(expected$);
  });
});
