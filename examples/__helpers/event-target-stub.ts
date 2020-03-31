type Callback = ((evt: any) => void) | null;

export type EventTargetStub = {
  map: Map<string, Callback[]>;
  emit: (type: string, value?: any) => void;
  addEventListener(type: string, listener: Callback): void;
  removeEventListener(type: string, listener?: Callback): void;
};

export function createEventTargetStub(): EventTargetStub {
  const map = new Map<string, Callback[]>();

  const emit = jest.fn().mockImplementation((type: string, value?: any) => {
    if (!map.has(type)) {
      return;
    }

    map.get(type).forEach(callback => callback(value));
  })

  const addEventListener: EventTargetStub['addEventListener'] = jest
    .fn()
    .mockImplementation((type: string, listener: Callback) => {
      if (!map.has(type)) {
        map.set(type, []);
      }

      const listeners = map.get(type);

      listeners.push(listener);
      map.set(type, listeners);
    });

  const removeEventListener: EventTargetStub['removeEventListener'] = jest
    .fn()
    .mockImplementation((type: string, listener: Callback) => {
      if (!map.has(type)) {
        return;
      }

      const listeners = map.get(type);
      const index = listeners.findIndex((value) => value === listener);

      if (index !== -1) {
        listeners.splice(index, 1);
      }

      map.set(type, listeners);
    });

  return {
    map,
    emit,
    addEventListener,
    removeEventListener,
  };
}
