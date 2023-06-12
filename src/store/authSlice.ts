import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  idSeller: string | null;
}

const initialState: AuthState = {
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
