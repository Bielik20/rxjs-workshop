import { fromEvent } from 'rxjs';
import { createEventTargetStub, EventTargetStub } from '../__helpers/event-target-stub';
import Mock = jest.Mock;

describe('Creation - fromEvent', () => {
  let valueSpy: Mock;
  let errorSpy: Mock;
  let completeSpy: Mock;
  let mockDocument: EventTargetStub;

  beforeEach(() => {
    valueSpy = jest.fn();
    errorSpy = jest.fn();
    completeSpy = jest.fn();
    mockDocument = createEventTargetStub();
  });

  it('fromEvent', () => {
    const stream$ = fromEvent(mockDocument, 'click');

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    mockDocument.emit('click');
    mockDocument.emit('click');
    mockDocument.emit('different');

    expect(valueSpy).toBeCalledTimes(2);
    expect(completeSpy).toBeCalledTimes(0);
  });

  it('fromEvent - is hot', () => {
    const stream$ = fromEvent(mockDocument, 'click');

    mockDocument.emit('click');
    mockDocument.emit('click');
    mockDocument.emit('different');

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    expect(valueSpy).toBeCalledTimes(0);
    expect(completeSpy).toBeCalledTimes(0);
  });

  it('fromEvent - listener is not created before subscribe', () => {
    const stream$ = fromEvent(mockDocument, 'click');

    expect(mockDocument.addEventListener).toBeCalledTimes(0);

    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    expect(mockDocument.addEventListener).toBeCalledTimes(1);
  });

  it('fromEvent - each subscription creates new listener', () => {
    const stream$ = fromEvent(mockDocument, 'click');

    stream$.subscribe(valueSpy, errorSpy, completeSpy);
    stream$.subscribe(valueSpy, errorSpy, completeSpy);

    expect(mockDocument.addEventListener).toBeCalledTimes(2);
  });
});
