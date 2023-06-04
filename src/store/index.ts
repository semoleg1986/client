import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import cartState, { toggleCart } from './cartState';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartstate: cartState,
  },
  preloadedState: {
    cartstate: { ...cartState, isVisible: false },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

