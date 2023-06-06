import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartSlice';
import cartState from './cartState';

// Дополнительно импортируйте типы для Redux Persist
import { PersistConfig } from 'redux-persist/es/types';
import { PersistPartial } from 'redux-persist/es/persistReducer';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  cartstate: cartState,
});

const persistedReducer = persistReducer<RootState, any>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default { store, persistor };