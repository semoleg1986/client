import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product }>) => {
      const { product } = action.payload;
      const existingItem = state.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.price += product.price;
      } else {
        state.push({ product, quantity: 1, price: product.price });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      const existingItemIndex = state.findIndex((item) => item.product.id === productId);
      if (existingItemIndex !== -1) {
        const existingItem = state[existingItemIndex];
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.price -= existingItem.product.price;
        } else {
          state.splice(existingItemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
    state.length = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
