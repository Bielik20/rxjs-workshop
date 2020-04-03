import { hot, Scheduler } from 'jest-marbles';

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
    const scroll$ = hot(    '-s---s--s');
    const resize$ = hot(    '------r--');
    const transition$ = hot('-------t');
    const expected$ = hot(  'as---sr|');

    // ##### Answer #####
    const stream$ = null;
    // ##################

    expect(stream$).toBeObservable(expected$);
    Scheduler.get().flush();
    expect(scrollUI).toHaveBeenCalledTimes(4);
    expect(resizeUI).toHaveBeenCalledTimes(2);
  });
});
