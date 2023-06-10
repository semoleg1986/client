import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const savedAuthState = localStorage.getItem('auth');

const preloadedState = {
  auth: savedAuthState ? JSON.parse(savedAuthState) : { isAuthenticated: false },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  const authState = state.auth;
  localStorage.setItem('auth', JSON.stringify(authState));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
