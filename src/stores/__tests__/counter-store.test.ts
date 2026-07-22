import { act } from '@testing-library/react-native';

import { useCounterStore } from '@/stores/counter-store';

describe('counter store', () => {
  beforeEach(() => {
    act(() => useCounterStore.getState().reset());
  });

  it('starts at zero', () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('increments and decrements', () => {
    act(() => useCounterStore.getState().increment());
    act(() => useCounterStore.getState().increment());
    expect(useCounterStore.getState().count).toBe(2);

    act(() => useCounterStore.getState().decrement());
    expect(useCounterStore.getState().count).toBe(1);
  });
});
