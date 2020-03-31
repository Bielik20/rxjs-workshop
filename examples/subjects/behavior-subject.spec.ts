import { BehaviorSubject } from 'rxjs';
import Mock = jest.Mock;

describe('BehaviorSubject', () => {
  let valueSpy: Mock;
  let errorSpy: Mock;
  let completeSpy: Mock;

  beforeEach(() => {
    valueSpy = jest.fn();
    errorSpy = jest.fn();
    completeSpy = jest.fn();
  });

  it('behavior subject', () => {
    const subject$ = new BehaviorSubject(1);

    expect(subject$.value).toBe(1);

    subject$.subscribe(valueSpy, errorSpy, completeSpy);

    subject$.next(2);
    subject$.next(3);

    expect(valueSpy).toBeCalledTimes(3);
    expect(subject$.value).toBe(3);
  });

  it('behavior subject - is ? warm', () => {
    const subject$ = new BehaviorSubject(1);

    subject$.next(2);
    subject$.next(3);

    subject$.subscribe(valueSpy, errorSpy, completeSpy);

    expect(valueSpy).toBeCalledTimes(1);
    expect(subject$.value).toBe(3);

    subject$.next(4);

    expect(valueSpy).toBeCalledTimes(2);
    expect(subject$.value).toBe(4);
  });
});
