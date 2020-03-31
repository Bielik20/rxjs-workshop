import { from } from 'rxjs';
import { flushPromises } from '../__helpers/flush-promises';
import Mock = jest.Mock;

describe('Creation - from', () => {
  let valueSpy: Mock;
  let errorSpy: Mock;
  let completeSpy: Mock;

  beforeEach(() => {
    valueSpy = jest.fn();
    errorSpy = jest.fn();
    completeSpy = jest.fn();
  });

  it('from promise', async () => {
    const stream$ = from(new Promise((resolve) => resolve()));

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    await flushPromises();

    expect(valueSpy).toBeCalledTimes(1);
    expect(completeSpy).toBeCalledTimes(1);
  });

  it('from promise - is cold', async () => {
    const resolveSpy = jest.fn();
    const stream$ = from(
      new Promise((resolve) => {
        resolveSpy();
        resolve();
      }),
    );

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    await flushPromises();

    expect(valueSpy).toBeCalledTimes(1);
    expect(completeSpy).toBeCalledTimes(1);
    expect(resolveSpy).toBeCalledTimes(1);

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    await flushPromises();

    expect(valueSpy).toBeCalledTimes(2);
    expect(completeSpy).toBeCalledTimes(2);
    expect(resolveSpy).toBeCalledTimes(1);
  });
});
