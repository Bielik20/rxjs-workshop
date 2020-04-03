import { cold } from 'jest-marbles';

describe('Warmup', () => {
  it('map - multiply values', () => {
    const input$ = cold(   '-a-b-c-', { a: 1, b: 10, c: 100 });
    const expected$ = cold('-a-b-c-', { a: 2, b: 20, c: 200 });

    // ##### Answer #####
    const stream$ = null;
    // ##################

    expect(stream$).toBeObservable(expected$);
  });

  it('filter - only even', () => {
    const input$ = cold(   '-a-b-c-', { a: 2, b: 3, c: 4 });
    const expected$ = cold('-a---c-', { a: 2, c: 4 });

    // ##### Answer #####
    const stream$ = null;
    // ##################

    expect(stream$).toBeObservable(expected$);
  });

  it('scan - sum values', () => {
    const input$ = cold(   '-a-b-c-', { a: 2, b: 3, c: 4 });
    const expected$ = cold('-a-b-c-', { a: 2, b: 5, c: 9 });

    // ##### Answer #####
    const stream$ = null;
    // ##################

    expect(stream$).toBeObservable(expected$);
  });

  it('merge - merge all stream', () => {
    const a$ = cold(       '-a--a-a');
    const b$ = cold(       '--b--b-');
    const expected$ = cold('-ab-aba');

    // ##### Answer #####
    const stream$ = null;
    // ##################

    expect(stream$).toBeObservable(expected$);
  });

  it('takeUntil - complete stream a$ with stream b$', () => {
    const a$ = cold(       '-a--a-a');
    const b$ = cold(       '--b');
    const expected$ = cold('-a|');

    // ##### Answer #####
    const stream$ = null;
    // ##################

    expect(stream$).toBeObservable(expected$);
  });

  it('startWith - add value to the beginning of stream', () => {
    const a$ = cold(       '----a-a');
    const expected$ = cold('s---a-a');

    // ##### Answer #####
    const stream$ = null;
    // ##################

    expect(stream$).toBeObservable(expected$);
  });

  it('switchMap - map one stream into another', () => {
    const a$ = cold(       'a--a');
    const b$ = cold(       'bb');
    const expected$ = cold('bb-bb');

    // ##### Answer #####
    const stream$ = null;
    // ##################

    expect(stream$).toBeObservable(expected$);
  });
});
