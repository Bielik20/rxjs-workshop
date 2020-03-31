import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import Mock = jest.Mock;

describe('Multicasting - share', () => {
  let beforeSpy: Mock;
  let afterSpy: Mock;
  let createSpy: Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    beforeSpy = jest.fn();
    afterSpy = jest.fn();
    createSpy = jest.fn();
  });

  it('with share', () => {
    const source$ = new Observable((subscriber) => {
      createSpy();
      setTimeout(() => subscriber.next('A'), 10);
      setTimeout(() => subscriber.next('B'), 20);
    });
    const stream$ = source$.pipe(share());

    stream$.subscribe(beforeSpy);

    jest.advanceTimersByTime(15); // time = 15, beforeSpy(15)

    stream$.subscribe(afterSpy);

    expect(afterSpy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(5); // time = 20, beforeSpy(20),  afterSpy(5)

    expect(createSpy).toHaveBeenCalledTimes(1);

    expect(beforeSpy).toHaveBeenCalledTimes(2);
    expect(beforeSpy).toHaveBeenNthCalledWith(1, 'A');
    expect(beforeSpy).toHaveBeenNthCalledWith(2, 'B');

    expect(afterSpy).toHaveBeenCalledTimes(1);
    expect(afterSpy).toHaveBeenNthCalledWith(1, 'B');
  });
});
