import { ReplaySubject } from 'rxjs';
import Mock = jest.Mock;

describe('ReplaySubject', () => {
  let valueSpy: Mock;
  let errorSpy: Mock;
  let completeSpy: Mock;

  beforeEach(() => {
    valueSpy = jest.fn();
    errorSpy = jest.fn();
    completeSpy = jest.fn();
  });

  it('replay subject', () => {
    const subject$ = new ReplaySubject();

    subject$.subscribe(valueSpy, errorSpy, completeSpy);

    subject$.next();
    subject$.next();

    expect(valueSpy).toBeCalledTimes(2);
  });

  it('replay subject - is ? warm', () => {
    const subject$ = new ReplaySubject();

    subject$.next();
    subject$.next();

    subject$.subscribe(valueSpy, errorSpy, completeSpy);

    expect(valueSpy).toBeCalledTimes(2);

    subject$.next();

    expect(valueSpy).toBeCalledTimes(3);
  });

  it('replay subject - can have a limit', () => {
    const subject$ = new ReplaySubject(1);

    subject$.next();
    subject$.next();

    subject$.subscribe(valueSpy, errorSpy, completeSpy);

    expect(valueSpy).toBeCalledTimes(1);
  });
});
