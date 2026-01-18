import { writable } from 'svelte/store';

function createCart() {
  const { subscribe, update } = writable<{ id: number; name: string; price: number; quantity: number }[]>([]);

  return {
    subscribe,
    add: (product) =>
      update((items) => {
        const existing = items.find((i) => i.id === product.id);
        if (existing) {
          return items; // no quantity editing yet
        }
        return [...items, { ...product, quantity: 1 }];
      })
  };
}

export const cart = createCart();
