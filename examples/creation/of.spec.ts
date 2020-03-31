import { of } from 'rxjs';
import Mock = jest.Mock;

describe('Creation - of', () => {
  let valueSpy: Mock;
  let errorSpy: Mock;
  let completeSpy: Mock;

  beforeEach(() => {
    valueSpy = jest.fn();
    errorSpy = jest.fn();
    completeSpy = jest.fn();
  });

  it('of', () => {
    const stream$ = of(1, 2, 3, 4, 5);

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    expect(valueSpy).toBeCalledTimes(5);
    expect(completeSpy).toBeCalledTimes(1);
  });

  it('of - is cold', () => {
    const stream$ = of(1, 2, 3, 4, 5);

    stream$.subscribe(valueSpy, errorSpy, completeSpy);
    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    expect(valueSpy).toBeCalledTimes(10);
    expect(completeSpy).toBeCalledTimes(2);
  });
});
