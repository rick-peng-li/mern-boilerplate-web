import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const attachTokenToHeaders = (token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};

export const getPosts = createAsyncThunk('post/getPosts', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const options = attachTokenToHeaders(token);
    const response = await axios.get('/api/posts', options);
    return response.data.posts;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const getPost = createAsyncThunk('post/getPost', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const options = attachTokenToHeaders(token);
    const response = await axios.get(`/api/posts/${id}`, options);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createPost = createAsyncThunk('post/createPost', async (formData, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const options = attachTokenToHeaders(token);
    const response = await axios.post('/api/posts', formData, options);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updatePost = createAsyncThunk('post/updatePost', async ({ id, formData }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const options = attachTokenToHeaders(token);
    const response = await axios.put(`/api/posts/${id}`, formData, options);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deletePost = createAsyncThunk('post/deletePost', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const options = attachTokenToHeaders(token);
    const response = await axios.delete(`/api/posts/${id}`, options);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const likePost = createAsyncThunk('post/likePost', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const options = attachTokenToHeaders(token);
    const response = await axios.post(`/api/posts/${id}/like`, {}, options);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    post: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
        state.error = null;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload);
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.map(p => p.id === action.payload.id ? action.payload : p);
        state.post = action.payload;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(p => p.id !== action.payload.id);
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.map(p => p.id === action.payload.id ? action.payload : p);
        if (state.post && state.post