import { cold, hot } from 'jest-marbles';
import { switchMap } from 'rxjs/operators';

describe('Flattening - switchMap', () => {
  it('switchMap - cold', () => {
    const a$ = cold('-a--a------');
    const b$ = cold('b---c');
    const stream$ = a$.pipe(switchMap(() => b$));
    const expected$ = cold('-b--b---c-');

    expect(stream$).toBeObservable(expected$);
  });

  it('switchMap - hot', () => {
    const a$ = hot('-a--a------');
    const b$ = hot('b---c');
    const stream$ = a$.pipe(switchMap(() => b$));
    const expected$ = hot('----c-----');

    expect(stream$).toBeObservable(expected$);
  });

  it('switchMap - hot/cold', () => {
    const a$ = hot('-a--a------');
    const b$ = cold('b---c');
    const stream$ = a$.pipe(switchMap(() => b$));
    const expected$ = cold('-b--b---c-');

    expect(stream$).toBeObservable(expected$);
  });

  it('switchMap - cold/hot', () => {
    const a$ = cold('-a--a------');
    const b$ = hot('b---c');
    const stream$ = a$.pipe(switchMap(() => b$));
    const expected$ = hot('----c-----');

    expect(stream$).toBeObservable(expected$);
  });
});
