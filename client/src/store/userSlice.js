import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios.js';

export const getProfile = createAsyncThunk('user/getProfile', async ({ username, navigate }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/users/${username}`);
    return response.data.user;
  } catch (err) {
    if (err?.response?.status === 404 && navigate) {
      navigate('/notfound');
    }
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const editUser = createAsyncThunk('user/editUser', async ({ id, formData, navigate }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/api/users/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (navigate) {
      navigate(`/${response.data.user.username}`);
    }
    return response.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async ({ id, navigate }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/users/${id}`);
    if (navigate) {
      navigate('/users');
    }
    return response.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.profile = null;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;