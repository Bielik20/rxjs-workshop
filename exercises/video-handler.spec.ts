import { hot, Scheduler } from 'jest-marbles';
import { merge, of } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

describe('Video Handler', () => {
  it('Wait for instance and respond to UI change', () => {
    const instance$ = hot('---i-');
    const scroll$ = hot(  '-s---s-s-');
    const resize$ = hot(  '------r--');
    const expected$ = hot('---i-iii-');

    // ##### Answer #####
    const stream$ = instance$.pipe(
      switchMap((value) => merge(scroll$, resize$, of({})).pipe(map(() => value))),
    );
    // ##################

    expect(stream$).toBeObservable(expected$);
  });

  it('Stop when transition', () => {
    const changes$ = hot(   '---i-iii-');
    const transition$ = hot('----t-t--t');
    const expected$ = hot(  '---i|');

    // ##### Answer #####
    const stream$ = changes$.pipe(takeUntil(transition$));
    // ##################

    expect(stream$).toBeObservable(expected$);
  });

  it('Update UI on change', () => {
    const updateUI = jest.fn();
    const changes$ = hot('---i-iii-');

    // ##### Answer #####
    const stream$ = changes$.pipe(tap(updateUI));
    // ##################

    expect(stream$).toSatisfyOnFlush(() => {
      expect(updateUI).toHaveBeenCalledTimes(4);
    });
  });

  it('Everything together', () => {
    const updateUI = jest.fn();
    const instance$ = hot(  '---i-');
    const scroll$ = hot(    '-s---s-s-');
    const resize$ = hot(    '------r--');
    const transition$ = hot('----t-t--t');
    const expected$ = hot(  '---i|');

    // ##### Answer #####
    const stream$ = instance$.pipe(
      switchMap((value) => merge(scroll$, resize$, of({})).pipe(map(() => value))),
      tap(updateUI),
      takeUntil(transition$),
    );
    // ##################

    expect(stream$).toBeObservable(expected$);
    Scheduler.get().flush();
    expect(updateUI).toHaveBeenCalledTimes(1);
  });
});
