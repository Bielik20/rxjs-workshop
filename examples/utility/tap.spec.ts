import { cold } from 'jest-marbles';
import { tap } from 'rxjs/operators';

describe('Utility - tap', () => {
  it('tap', () => {
    const spy = jest.fn();
    const source$ = cold('---a-b-c');
    const stream$ = source$.pipe(tap(spy));

    expect(stream$).toSatisfyOnFlush(() => {
      expect(spy).toBeCalledTimes(3);
      expect(spy).toHaveBeenNthCalledWith(1, 'a');
      expect(spy).toHaveBeenNthCalledWith(2, 'b');
      expect(spy).toHaveBeenNthCalledWith(3, 'c');
      expect(stream$).toBeObservable(source$);
    });
  });
});
