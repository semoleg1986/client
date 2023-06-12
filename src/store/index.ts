import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import cartState from './cartState';

const savedAuthState = localStorage.getItem('auth');
const savedCartState = localStorage.getItem('cart');

const preloadedState = {
  auth: savedAuthState ? JSON.parse(savedAuthState) : { isAuthenticated: false },
  cart: savedCartState ? JSON.parse(savedCartState) : { items: [] },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    cartstate: cartState,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  const authState = state.auth;
  // const cartState = state.cart;
  localStorage.setItem('auth', JSON.stringify(authState));
  localStorage.setItem('cart', JSON.stringify(cartState));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
