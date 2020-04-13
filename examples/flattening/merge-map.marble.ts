// Paste in here: https://rxviz.com/examples/custom

const { Observable, Subject } = Rx;
const { mergeMap, switchMap, groupBy, map, tap } = RxOperators;

function hot(marbles, values = {}) {
  const subject$ = new Subject();

  executeMarbles(subject$, marbles, values);

  return  subject$;
}

function cold(marbles, values = {}) {
  return new Observable((subscriber) => {
    executeMarbles(subscriber, marbles, values);
  });
}

function time(marbles) {
  return new Promise((res) => setTimeout(res, marbles.length * 500))
}

async function executeMarbles(subject$, marbles, values = {}) {
  for (const marble of marbles) {
    switch (marble) {
      case '-': {
        await new Promise((res) => setTimeout(res, 500));
        break;
      }
      case '|': {
        subject$.complete();
        break;
      }
      case '#': {
        subject$.error(new Error());
        break;
      }
      default: {
        if (marble in values) {
          subject$.next(values[marble]);
        } else {
          subject$.next(marble);
        }
        break;
      }
    }
  }
}

const foo$ = hot('-x--y');
const bar$ = cold('b---c');

foo$.pipe(
  mergeMap((value) => bar$.pipe(map((val) => ({ source: value, actual: val })))),
  groupBy(
    (x) => x.source,
    (a) => a.actual,
  ),
);
