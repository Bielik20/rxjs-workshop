import { cold, hot } from 'jest-marbles';
import { exhaustMap } from 'rxjs/operators';

describe('Flattening - exhaustMap', () => {
  it('exhaustMap - cold', () => {
    const a$ = cold('-a--a--a----');
    const b$ = cold('b---c|');
    const stream$ = a$.pipe(exhaustMap(() => b$));
    const expected$ = cold('-b---c-b---c');

    expect(stream$).toBeObservable(expected$);
  });

  it('concatMap - cold with no completion', () => {
    const a$ = cold('-a--a--a----');
    const b$ = cold('b---c');
    const stream$ = a$.pipe(exhaustMap(() => b$));
    const expected$ = cold('-b---c');

    expect(stream$).toBeObservable(expected$);
  });

  it('exhaustMap - hot', () => {
    const a$ = hot('-a--a--a----');
    const b$ = hot('b---c|');
    const stream$ = a$.pipe(exhaustMap(() => b$));
    const expected$ = hot('----c-----');

    expect(stream$).toBeObservable(expected$);
  });
});
