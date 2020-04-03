import { hot, Scheduler } from 'jest-marbles';
import { filter, map, scan, withLatestFrom } from 'rxjs/operators';

describe('JWPlayer', () => {
  /**
   * play, impression, complete
   * each play should increase depth by 1
   * each event should call get state and include it.
   */
  it('should model stream', () => {
    const stateGetter = createStateGetter();
    const player$ = hot(  '-p--i-c---p-i--c');
    const expected$ = hot('-a--b-c---d-e--f', {
      a: {
        event: 'p',
        depth: 1,
        state: 10,
      },
      b: {
        event: 'i',
        depth: 1,
        state: 20,
      },
      c: {
        event: 'c',
        depth: 1,
        state: 30,
      },
      d: {
        event: 'p',
        depth: 2,
        state: 40,
      },
      e: {
        event: 'i',
        depth: 2,
        state: 50,
      },
      f: {
        event: 'c',
        depth: 2,
        state: 60,
      },
    });

    // ##### Answer #####
    const depth$ = player$.pipe(
      filter((event) => event === 'p'),
      scan((depth) => depth + 1, 0),
    );
    const state$ = player$.pipe(map(() => stateGetter()));
    const stream$ = player$.pipe(
      withLatestFrom(depth$, state$),
      map(([event, depth, state]) => ({ event, depth, state })),
    );
    // ##################

    expect(stream$).toBeObservable(expected$);
    Scheduler.get().flush();
    expect(stateGetter).toHaveBeenCalledTimes(6);
  });
});

function createStateGetter(): () => number | jest.Mock {
  const base = 10;
  let count = 0;

  return jest.fn(() => ++count * base);
}
