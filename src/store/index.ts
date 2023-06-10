import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import cartState from './cartState';

const savedCartState = localStorage.getItem('cart');
const savedAuthState = localStorage.getItem('auth');

const preloadedState = {
  cart: savedCartState ? JSON.parse(savedCartState) : [],
  auth: savedAuthState ? JSON.parse(savedAuthState) : { isAuthenticated: false },
  cartstate: { ...cartState, isVisible: false },
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
  const cartState = state.cart;
  const authState = state.auth;

  localStorage.setItem('cart', JSON.stringify(cartState));
  localStorage.setItem('auth', JSON.stringify(authState));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
