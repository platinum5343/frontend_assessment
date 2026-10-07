import { create } from "zustand";

export interface CartItem {
  serviceId: string;
  slug: string;
  name: string;
  selectedOptions: Record<string, string>;
  quantity: number;
  price: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (serviceId: string, selectedOptions: Record<string, string>) => void;
  updateQuantity: (
    serviceId: string,
    selectedOptions: Record<string, string>,
    quantity: number
  ) => void;
  clearCart: () => void;
}

function createItemKey(
  serviceId: string,
  selectedOptions: Record<string, string>
): string {
  const sortedKeys = Object.keys(selectedOptions).sort();
  const optionStr = sortedKeys
    .map((k) => `${k}:${selectedOptions[k]}`)
    .join("|");
  return `${serviceId}|${optionStr}`;
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const key = createItemKey(item.serviceId, item.selectedOptions);
      const existingIndex = state.items.findIndex(
        (i) => createItemKey(i.serviceId, i.selectedOptions) === key
      );

      if (existingIndex !== -1) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (item.quantity ?? 1),
        };
        return { items: updated };
      }

      return {
        items: [...state.items, { ...item, quantity: item.quantity ?? 1 }],
      };
    }),
  removeItem: (serviceId, selectedOptions) =>
    set((state) => {
      const key = createItemKey(serviceId, selectedOptions);
      return {
        items: state.items.filter(
          (i) => createItemKey(i.serviceId, i.selectedOptions) !== key
        ),
      };
    }),
  updateQuantity: (serviceId, selectedOptions, quantity) =>
    set((state) => {
      const key = createItemKey(serviceId, selectedOptions);
      return {
        items: state.items.map((i) =>
          createItemKey(i.serviceId, i.selectedOptions) === key
            ? { ...i, quantity: Math.max(0, quantity) }
            : i
        ),
      };
    }),
  clearCart: () => ({ items: [] }),
}));
