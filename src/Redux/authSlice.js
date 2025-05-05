import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginSuperadmin = createAsyncThunk(
  'auth/loginSuperadmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}superadmin/login`,
        { email, password }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('superadminToken') || null,
    user: JSON.parse(localStorage.getItem('superadminData')) || null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('superadminToken');
      localStorage.removeItem('superadminData');
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSuperadmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginSuperadmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.data;
        localStorage.setItem('superadminToken', action.payload.token);
        localStorage.setItem('superadminData', JSON.stringify(action.payload.data));
      })
      .addCase(loginSuperadmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;