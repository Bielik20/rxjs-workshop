import { Observable } from 'rxjs';
import Mock = jest.Mock;

describe('Creation - new', () => {
  let valueSpy: Mock;
  let errorSpy: Mock;
  let completeSpy: Mock;
  let teardownSpy: Mock;

  beforeEach(() => {
    valueSpy = jest.fn();
    errorSpy = jest.fn();
    completeSpy = jest.fn();
    teardownSpy = jest.fn();
  });

  it('new', () => {
    const stream$ = new Observable((subscriber) => {
      subscriber.next();
      subscriber.next();
      subscriber.complete();

      return () => teardownSpy();
    });

    stream$.subscribe(valueSpy, errorSpy, completeSpy);
    expect(valueSpy).toBeCalledTimes(2);
    expect(teardownSpy).toBeCalledTimes(1);
    expect(completeSpy).toBeCalledTimes(1);
  });

  it('new - without complete', () => {
    const stream$ = new Observable((subscriber) => {
      subscriber.next();
      subscriber.next();

      return () => teardownSpy();
    });

    stream$.subscribe(valueSpy, errorSpy, completeSpy);
    expect(valueSpy).toBeCalledTimes(2);
    expect(completeSpy).toBeCalledTimes(0);
  });

  it('new - is cold', () => {
    const createSpy = jest.fn();
    const stream$ = new Observable((subscriber) => {
      createSpy();
      subscriber.next();
    });

    stream$.subscribe();
    expect(createSpy).toBeCalledTimes(1);
    stream$.subscribe();
    expect(createSpy).toBeCalledTimes(2);
  });
});
