import { interval, timer } from 'rxjs';
import Mock = jest.Mock;

describe('Creation - timers', () => {
  let valueSpy: Mock;
  let errorSpy: Mock;
  let completeSpy: Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    valueSpy = jest.fn();
    errorSpy = jest.fn();
    completeSpy = jest.fn();
  });

  it('timer', () => {
    const stream$ = timer(1000);

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    jest.advanceTimersByTime(1000);

    expect(valueSpy).toBeCalledTimes(1);
    expect(completeSpy).toBeCalledTimes(1);
  });

  it('timer - is cold', () => {
    const stream$ = timer(1000);

    jest.advanceTimersByTime(1000); // 1000ms passed

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    expect(valueSpy).toBeCalledTimes(0);

    jest.advanceTimersByTime(1000); // 2000ms passed, 1000ms passed since subscribe

    expect(valueSpy).toBeCalledTimes(1);
  });

  it('interval', () => {
    const stream$ = interval(1000);

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    jest.advanceTimersByTime(1000);

    expect(valueSpy).toBeCalledTimes(1);
    expect(completeSpy).toBeCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(valueSpy).toBeCalledTimes(2);
    expect(completeSpy).toBeCalledTimes(0);
  });

  it('interval - is cold', () => {
    const stream$ = interval(1000);

    jest.advanceTimersByTime(500); // 500ms passed

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    jest.advanceTimersByTime(500); // 1000ms passed, 500ms passed since subscribe

    expect(valueSpy).toBeCalledTimes(0);

    jest.advanceTimersByTime(500); // 1500ms passed, 1000ms passed since subscribe

    expect(valueSpy).toBeCalledTimes(1);
  });
});
