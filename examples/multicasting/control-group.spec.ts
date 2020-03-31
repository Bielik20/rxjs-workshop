import { Observable } from 'rxjs';
import Mock = jest.Mock;

describe('Multicasting - control group', () => {
  let beforeSpy: Mock;
  let afterSpy: Mock;
  let createSpy: Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    beforeSpy = jest.fn();
    afterSpy = jest.fn();
    createSpy = jest.fn();
  });

  it('without multicasting', () => {
    const stream$ = new Observable((subscriber) => {
      createSpy();
      setTimeout(() => subscriber.next('A'), 10);
      setTimeout(() => subscriber.next('B'), 20);
    });

    stream$.subscribe(beforeSpy);

    jest.advanceTimersByTime(15); // time = 15, beforeSpy(15)

    stream$.subscribe(afterSpy);

    jest.advanceTimersByTime(5); // time = 20, beforeSpy(20),  afterSpy(5)

    expect(createSpy).toHaveBeenCalledTimes(2);

    expect(beforeSpy).toHaveBeenCalledTimes(2);
    expect(beforeSpy).toHaveBeenNthCalledWith(1, 'A');
    expect(beforeSpy).toHaveBeenNthCalledWith(2, 'B');

    expect(afterSpy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(15); // time = 35, beforeSpy(35),  afterSpy(20)

    expect(afterSpy).toHaveBeenCalledTimes(2);
    expect(afterSpy).toHaveBeenNthCalledWith(1, 'A');
    expect(afterSpy).toHaveBeenNthCalledWith(2, 'B');
  });
});
