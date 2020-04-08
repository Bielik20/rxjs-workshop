import { Subject } from 'rxjs';
import Mock = jest.Mock;

describe('Subject', () => {
  let valueSpy: Mock;
  let errorSpy: Mock;
  let completeSpy: Mock;

  beforeEach(() => {
    valueSpy = jest.fn();
    errorSpy = jest.fn();
    completeSpy = jest.fn();
  });

  it('subject', () => {
    const subject$ = new Subject();

    subject$.subscribe(valueSpy, errorSpy, completeSpy);

    subject$.next();
    subject$.next();

    expect(valueSpy).toBeCalledTimes(2);
    expect(completeSpy).toBeCalledTimes(0);

    subject$.complete();

    expect(completeSpy).toBeCalledTimes(1);
  });

  it('subject - is hot', () => {
    const subject$ = new Subject();

    subject$.next();
    subject$.next();

    subject$.subscribe(valueSpy, errorSpy, completeSpy);

    subject$.complete();

    expect(valueSpy).toBeCalledTimes(0);
    expect(completeSpy).toBeCalledTimes(1);
  });
});
