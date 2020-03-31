import { Subject } from 'rxjs';
import { observeOn, tap } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import Mock = jest.Mock;

describe('Scheduler', () => {
  let beforeSpy: Mock;
  let afterSpy: Mock;
  let rxTestScheduler: TestScheduler;

  beforeEach(() => {
    beforeSpy = jest.fn();
    afterSpy = jest.fn();
    rxTestScheduler = new TestScheduler(null);
  });

  it('observeOn', () => {
    const subject$ = new Subject();
    const stream$ = subject$.pipe(tap(beforeSpy), observeOn(rxTestScheduler), tap(afterSpy));

    stream$.subscribe();
    subject$.next();

    expect(beforeSpy).toBeCalledTimes(1);
    expect(afterSpy).toBeCalledTimes(0);

    rxTestScheduler.flush();

    expect(afterSpy).toBeCalledTimes(1);
  });
});
