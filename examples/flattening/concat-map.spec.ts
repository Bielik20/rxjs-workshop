import { cold, hot } from 'jest-marbles';
import { concatMap } from 'rxjs/operators';

describe('Flattening - concatMap', () => {
  it('concatMap - cold', () => {
    const a$ = cold(       '-a--a------');
    const b$ = cold(       'b---c|');
    const expected$ = cold('-b---cb---c');
    const stream$ = a$.pipe(concatMap(() => b$));

    expect(stream$).toBeObservable(expected$);
  });

  it('concatMap - cold with no completion', () => {
    const a$ = cold(       '-a--a------');
    const b$ = cold(       'b---c');
    const expected$ = cold('-b---c');
    const stream$ = a$.pipe(concatMap(() => b$));

    expect(stream$).toBeObservable(expected$);
  });

  it('concatMap - hot', () => {
    const a$ = hot(       '-a--a------');
    const b$ = hot(       'b---c|');
    const expected$ = hot('----c-----');
    const stream$ = a$.pipe(concatMap(() => b$));

    expect(stream$).toBeObservable(expected$);
  });
});
