import { useCounterStore } from '@/stores/counter-store';

// Stores can be tested without rendering: call actions via getState(). No
// act() is needed because no React tree is subscribed.
describe('counter store', () => {
  beforeEach(() => {
    useCounterStore.getState().reset();
  });

  it('starts at zero', () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('increments and decrements', () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(2);

    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(1);
  });
});
