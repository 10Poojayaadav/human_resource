import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../api/http";

const BASE = "attendance";


// ================= FETCH ATTENDANCE =================
export const fetchPosts = createAsyncThunk(
  "attendance/fetchPosts",
  async () => {
    const response = await get(BASE);
    console.log(response.data, ">>>>>>..");
    return response.data;
  }
);


// ================= ADD / UPDATE ATTENDANCE =================
export const addPost = createAsyncThunk(
  "attendance/addPost",
  async (attendanceData) => {
    const response = await post(BASE, attendanceData);
    return response.data.data; // backend wraps inside data
  }
);


// ================= SLICE =================
const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // FETCH
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

      // ADD / UPDATE
      .addCase(addPost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) =>
            item.employee_id === action.payload.employee_id &&
            item.date === action.payload.date
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.unshift(action.payload);
        }
      });
  },
});

export default attendanceSlice.reducer;