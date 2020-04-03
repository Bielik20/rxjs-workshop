import { cold, hot } from 'jest-marbles';
import { switchMap } from 'rxjs/operators';

describe('Flattening - switchMap', () => {
  it('switchMap - cold', () => {
    const a$ = cold(       '-a--a------');
    const b$ = cold(       'b---c');
    const expected$ = cold('-b--b---c-');
    const stream$ = a$.pipe(switchMap(() => b$));

    expect(stream$).toBeObservable(expected$);
  });

  it('switchMap - hot', () => {
    const a$ = hot(       '-a--a------');
    const b$ = hot(       'b---c');
    const expected$ = hot('----c-----');
    const stream$ = a$.pipe(switchMap(() => b$));

    expect(stream$).toBeObservable(expected$);
  });

  it('switchMap - hot/cold', () => {
    const a$ = hot(        '-a--a------');
    const b$ = cold(       'b---c');
    const expected$ = cold('-b--b---c-');
    const stream$ = a$.pipe(switchMap(() => b$));

    expect(stream$).toBeObservable(expected$);
  });

  it('switchMap - cold/hot', () => {
    const a$ = cold(      '-a--a------');
    const b$ = hot(       'b---c');
    const expected$ = hot('----c-----');
    const stream$ = a$.pipe(switchMap(() => b$));

    expect(stream$).toBeObservable(expected$);
  });
});
