import { create } from 'zustand';

interface BasketState {
  items: Product[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (id: string) => void;
}

export const useBasketStore = create<BasketState>((set) => ({
  items: [],

  addToBasket: (product) =>
    set((state) => ({
      items: [...state.items, product],
    })),

  removeFromBasket: (id) =>
    set((state) => {
      const index = state.items.findIndex((item) => item._id === id);
      if (index < 0) return state;
      const newItems = [...state.items];
      newItems.splice(index, 1);
      return { items: newItems };
    }),
}));
