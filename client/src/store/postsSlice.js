import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios.js';

export const getPosts = createAsyncThunk('posts/getPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/posts');
    return response.data.posts;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const getPost = createAsyncThunk('posts/getPost', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/posts/${id}`);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createPost = createAsyncThunk('posts/createPost', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/posts', formData);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/api/posts/${id}`, formData);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/posts/${id}`);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const likePost = createAsyncThunk('posts/likePost', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/posts/${id}/like`);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const postsSlice = createSlice({
  name: 'posts',
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
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map(p => p.id === action.payload.id ? action.payload : p);
        if (state.post && state.post.id === action.payload.id) {
          state.post = action.payload;
        }
      });
  },
});

export default postsSlice.reducer;