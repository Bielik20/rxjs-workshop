import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import Mock = jest.Mock;

describe('Multicasting - shareReplay', () => {
  let beforeSpy: Mock;
  let afterSpy: Mock;
  let createSpy: Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    beforeSpy = jest.fn();
    afterSpy = jest.fn();
    createSpy = jest.fn();
  });

  it('with shareReplay', () => {
    const source$ = new Observable((subscriber) => {
      createSpy();
      setTimeout(() => subscriber.next('A'), 10);
      setTimeout(() => subscriber.next('B'), 20);
    });
    const stream$ = source$.pipe(shareReplay(1));

    stream$.subscribe(beforeSpy);

    jest.advanceTimersByTime(25); // time = 25, beforeSpy(25)

    stream$.subscribe(afterSpy);

    expect(createSpy).toHaveBeenCalledTimes(1);

    expect(beforeSpy).toHaveBeenCalledTimes(2);
    expect(beforeSpy).toHaveBeenNthCalledWith(1, 'A');
    expect(beforeSpy).toHaveBeenNthCalledWith(2, 'B');

    expect(afterSpy).toHaveBeenCalledTimes(1);
    expect(afterSpy).toHaveBeenNthCalledWith(1, 'B');
  });
});
