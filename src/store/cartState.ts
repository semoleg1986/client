import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  isVisible: boolean;
}

const initialState: CartState = {
  isVisible: false,
};

const cartState = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleCart } = cartState.actions;

export default cartState.reducer;