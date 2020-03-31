import { cold, hot } from 'jest-marbles';
import { mergeMap } from 'rxjs/operators';

describe('Flattening - mergeMap = flatMap', () => {
  it('mergeMap - cold', () => {
    const a$ = cold('-a--a------');
    const b$ = cold('b---c');
    const stream$ = a$.pipe(mergeMap(() => b$));
    const expected$ = cold('-b--bc--c-');

    expect(stream$).toBeObservable(expected$);
  });

  it('mergeMap - hot', () => {
    const a$ = hot('-a--a------');
    const b$ = hot('b---c');
    const stream$ = a$.pipe(mergeMap(() => b$));
    const expected$ = hot('----(cc)-');

    expect(stream$).toBeObservable(expected$);
  });
});
