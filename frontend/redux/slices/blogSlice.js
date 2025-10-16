import api from '@/lib/client-axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createBlog = createAsyncThunk("blog/createBlog", async (data, thunkAPI) => {
  try{
    const response = await api.post("/blog/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data.data.blogs;
  }catch(err){
    const message =
        err.response?.data?.message || err.message || "Blog creation failed";
      return thunkAPI.rejectWithValue(message);
  }
})

export const fetchAllBlogs = createAsyncThunk("blog/fetchAllBlogs", async (_, thunkAPI) => {
  try{
    const response = await api.get("/blog/", {
      headers: { "Content-Type": "application/json" },
    })
    return response.data.data.blogs;
  }catch(error){
    const message = error.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
})

export const fetchSingleBlogs = createAsyncThunk("blog/fetchSingleBlogs", async (blogId, thunkAPI) => {
  try{
    const response = await api.get(`/blog/${blogId}`, {
      headers: { "Content-Type": "application/json" },
    })
    // console.log(response);
    return response.data.data.blog;
  }catch(err){
    const message = err.response?.data?.message || "Something went wrong";
    return thunkAPI.rejectWithValue(message);
  }
})

export const updateBlog = createAsyncThunk("blog/updateBlog", async (data, thunkAPI) => {
  try{
    const response = await api.put(`/blog/${data.id}`, data.formData, {
    headers: {"Content-type": "multipart/form-data"}
  })
  // console.log(response.data.data.blog);
  return response.data.data.blog
  }catch(err){
    const message = err.response?.data?.message || "update blog failed";
    return thunkAPI.rejectWithValue(message);
  }
})

export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (blogId, thunkAPI) => {
  try{
    const res = await api.delete(`/blog/${blogId}`, {
      headers: {"Content-Type": "application/json"}
    })
    // console.log(res);
    return blogId;
  }catch(err){
    const msg = err.response?.data?.message || "delete blog failed";
    return thunkAPI.rejectWithValue(msg);
  }
})

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(createBlog.fulfilled, (state, action) => {
      state.blogs = [action.payload, ...state.blogs];
      state.error = null;
      state.loading = false;
    })
    .addCase(createBlog.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })


    .addCase(fetchSingleBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSingleBlogs.fulfilled, (state, action) => {
      state.blogs = [action.payload];
      state.error = null;
      state.loading = false;
    })
    .addCase(fetchSingleBlogs.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    .addCase(updateBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = [action.payload, ...state.blogs];
      state.error = null;
    })
    .addCase(updateBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(fetchAllBlogs.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(fetchAllBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.blogs = [...action.payload];
    })
    .addCase(fetchAllBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


    .addCase(deleteBlog.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
    })
    .addCase(deleteBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  }
});

export default blogSlice.reducer;
