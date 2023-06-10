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
    loginUser: (state, action: PayloadAction<{ token: string, idSeller: string }>) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.idSeller = action.payload.idSeller;
      },
    logoutUser: (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.idSeller = null;
      },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
