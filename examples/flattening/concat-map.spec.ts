import { cold, hot } from 'jest-marbles';
import { concatMap } from 'rxjs/operators';

describe('Flattening - concatMap', () => {
  it('concatMap - cold', () => {
    const a$ = cold('-a--a------');
    const b$ = cold('b---c|');
    const stream$ = a$.pipe(concatMap(() => b$));
    const expected$ = cold('-b---cb---c');

    expect(stream$).toBeObservable(expected$);
  });

  it('concatMap - cold with no completion', () => {
    const a$ = cold('-a--a------');
    const b$ = cold('b---c');
    const stream$ = a$.pipe(concatMap(() => b$));
    const expected$ = cold('-b---c');

    expect(stream$).toBeObservable(expected$);
  });

  it('concatMap - hot', () => {
    const a$ = hot('-a--a------');
    const b$ = hot('b---c|');
    const stream$ = a$.pipe(concatMap(() => b$));
    const expected$ = hot('----c-----');

    expect(stream$).toBeObservable(expected$);
  });
});
