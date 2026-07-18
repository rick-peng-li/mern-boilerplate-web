import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios.js';
import Cookies from 'js-cookie';

export const loadMe = createAsyncThunk('auth/loadMe', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/users/me');
    return response.data.me;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const loginUserWithEmail = createAsyncThunk('auth/loginUserWithEmail', async ({ formData, navigate }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/login', formData);
    return { token: response.data.token, me: response.data.user };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const logInUserWithOauth = createAsyncThunk('auth/logInUserWithOauth', async (token, { rejectWithValue }) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    const response = await axios.get('/api/users/me', { headers });
    return { me: response.data.me, token };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const logOutUser = createAsyncThunk('auth/logOutUser', async () => {
  try {
    Cookies.remove('token');
    await axios.get('/auth/logout');
  } catch (err) {
    console.error(err);
  }
});

export const registerUserWithEmail = createAsyncThunk('auth/registerUserWithEmail', async ({ formData, navigate }, { rejectWithValue }) => {
  try {
    await axios.post('/auth/register', formData);
    if (navigate) {
      navigate('/login');
    }
    return null;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const reseedDatabase = createAsyncThunk('auth/reseedDatabase', async () => {
  try {
    await axios.get('/api/users/reseed');
  } catch (err) {
    return err.response?.data?.message || err.message;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('token') || null,
    me: null,
    isAuthenticated: false,
    isLoading: false,
    appLoaded: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      Cookies.set('token', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appLoaded = true;
        if (action.payload) {
          state.me = action.payload;
          state.isAuthenticated = true;
        } else {
          state.me = null;
          state.isAuthenticated = false;
        }
        state.error = null;
      })
      .addCase(loadMe.rejected, (state, action) => {
        state.isLoading = false;
        state.appLoaded = true;
        state.me = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(loginUserWithEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.me = action.payload.me;
        state.isAuthenticated = true;
        state.error = null;
        Cookies.set('token', action.payload.token);
      })
      .addCase(loginUserWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logInUserWithOauth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInUserWithOauth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.me = action.payload.me;
        state.isAuthenticated = true;
        state.error = null;
        Cookies.set('token', action.payload.token);
      })
      .addCase(logInUserWithOauth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.token = null;
        state.me = null;
        state.isAuthenticated = false;
        state.error = null;
        Cookies.remove('token');
      })
      .addCase(registerUserWithEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserWithEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUserWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(reseedDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reseedDatabase.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.me = null;
        state.isAuthenticated = false;
        state.error = null;
        Cookies.remove('token');
      })
      .addCase(reseedDatabase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;