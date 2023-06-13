import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from '../types';

const initialState: IAuthState = {
  isAuthenticated: false,
  token: null,
  idSeller: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ token: string; idSeller: string }>) => {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        idSeller: action.payload.idSeller,
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        idSeller: null,
      };
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
