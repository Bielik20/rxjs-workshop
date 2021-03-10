import { cold, hot } from 'jest-marbles';
import { exhaustMap } from 'rxjs/operators';

describe('Flattening - exhaustMap', () => {
  it('exhaustMap - cold', () => {
    const a$ = cold(       '-a--a--a----');
    const b$ = cold(       'b---c|');
    const expected$ = cold('-b---c-b---c');

    const stream$ = a$.pipe(exhaustMap(() => b$));

    expect(stream$).toBeObservable(expected$);
  });

  it('concatMap - cold with no completion', () => {
    const a$ = cold(       '-a--a--a----');
    const b$ = cold(       'b---c');
    const expected$ = cold('-b---c');

    const stream$ = a$.pipe(exhaustMap(() => b$));

    expect(stream$).toBeObservable(expected$);
  });

  it('exhaustMap - hot', () => {
    const a$ = hot(       '-a--a--a----');
    const b$ = hot(       'b---c|');
    const expected$ = hot('----c-----');

    const stream$ = a$.pipe(exhaustMap(() => b$));

    expect(stream$).toBeObservable(expected$);
  });
});
