import { hot, Scheduler } from 'jest-marbles';
import { merge } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';

describe('Impact Handler', () => {
  /**
   * should update scrollUI and resizeUI once at the beginning
   * should update scrollUI on scroll$
   * should update scrollUI and resizeUI on resize$
   * should stop on transition
   * hint: use `startWith('a')` for startup
   */
  it('update UI', () => {
    const scrollUI = jest.fn();
    const resizeUI = jest.fn();
    const scroll$ = hot('-s---s--s');
    const resize$ = hot('------r--');
    const transition$ = hot('-------t');
    const expected$ = hot('as---sr|');

    // ##### Answer #####
    const a$ = resize$.pipe(
      startWith('a'),
      tap(() => {
        scrollUI();
        resizeUI();
      }),
      takeUntil(transition$),
    );
    const b$ = scroll$.pipe(
      tap(() => {
        scrollUI();
      }),
      takeUntil(transition$),
    );
    const stream$ = merge(a$, b$);
    // ##################

    expect(stream$).toBeObservable(expected$);
    Scheduler.get().flush();
    expect(scrollUI).toHaveBeenCalledTimes(4);
    expect(resizeUI).toHaveBeenCalledTimes(2);
  });
});
