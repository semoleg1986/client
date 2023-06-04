import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  isVisible: boolean;
}

const initialState: CartState = {
  isVisible: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;