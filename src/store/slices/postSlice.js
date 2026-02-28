import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, put, del } from "../../api/http";

const BASE = "employees";

// Fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const data = await get(BASE);

  return data.data;
});

// Add post
export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
  const formData = new FormData();
  Object.keys(postData).forEach((key) => {
    formData.append(key, postData[key]);
  });

  const data = await post(BASE, formData, true);

  return data.data;
});

export const togglePublish = createAsyncThunk(
  "posts/togglePublish",
  async (id) => {
    const response = await post(`posts/${id}/toggle-publish`);
    return response;
  },
);

// Update post
export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const response = await put(`/employees/${post.id}`, post);

  return response.data.data;
});

// Delete post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await del(`${BASE}/${id}`);
  return id;
});

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      })

      .addCase(togglePublish.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const index = state.items.findIndex((p) => p.id === updated.id);
        if (index !== -1) state.items[index] = updated;
      });
  },
});

export default postSlice.reducer;
