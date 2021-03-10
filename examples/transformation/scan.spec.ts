import { cold } from 'jest-marbles';
import { scan } from 'rxjs/operators';

describe('Transformation - scan', () => {
  it('scan', () => {
    const source$ = cold(  '---a-b-c', { a: 1, b: 2, c: 3 });
    const expected$ = cold('---a-b-c', { a: 1, b: 3, c: 6 });

    const stream$ = source$.pipe(scan((acc, curr) => acc + curr, 0));

    expect(stream$).toBeObservable(expected$);
  });
});
