import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from './services/movieApi';
import formReducer from './slices/formSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    form: formReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
