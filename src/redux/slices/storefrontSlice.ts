import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// StoreFront.ts

export const createWebpage = createAsyncThunk(
  "storefront/createWebpage",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/webpages/create-page`,
        data
      );
      console.log("Add Webpage Response: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add web page"
      );
    }
  }
);

export const getWebPages = createAsyncThunk(
  "storefront/getWebPages",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/webpages/web-pages`);
      console.log("Fetch Webpage Response: ", res?.data);
      return res?.data?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch web page"
      );
    }
  }
);

export const getWebPageById = createAsyncThunk(
  "storefront/getWebPageById",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/webpages/single-page/${id}`
      );
      console.log("Fetch Webpage Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch web page"
      );
    }
  }
);

export const updateWebPage = createAsyncThunk(
  "storefront/updateWebPage",
  async ({ id, data }: { id: any; data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/webpages/update/${id}`,
        data
      );
      console.log("Update Webpage Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update web page"
      );
    }
  }
);

export const deleteWebPage = createAsyncThunk(
  "storefront/deleteWebPage",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`dashboard/webpages/delete/${id}`);
      console.log("Delete Webpage Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete web page"
      );
    }
  }
);

// ADD BLOG
export const createBlog = createAsyncThunk(
  "storefront/createBlog",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`dashboard/blogs/add-blog`, data);
      console.log("Add blog Response: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create blog post"
      );
    }
  }
);

// ADD BLOG
export const fetchBlogs = createAsyncThunk(
  "storefront/fetchBlogs",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/blogs/get-blog`);
      console.log("Fetch blog Response: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch blog post"
      );
    }
  }
);

// FETCH BLOG BY ID
export const fetchBlogbyId = createAsyncThunk(
  "storefront/fetchBlogbyId",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/blogs/get-blogSingle/${id}`
      );
      console.log("Fetch blog Response by id: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch blog post by id"
      );
    }
  }
);

// UPDATE BLOG
export const updateBlog = createAsyncThunk(
  "storefront/updateBlog",
  async ({ id, data }: { id: any; data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/blogs/update-blog/${id}`,
        data
      );
      console.log("Update blog Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update blog"
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "storefront/deleteBlog",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/blogs/delete-blog/${id}`
      );
      console.log("Delete blog Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete blog"
      );
    }
  }
);

export const createLogo = createAsyncThunk(
  "storefront/createLogo",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`dashboard/logos/add-logo`, data);
      console.log("Add logo Response: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add logo"
      );
    }
  }
);

export const fetchLogo = createAsyncThunk(
  "storefront/fetchLogo",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/logos/get-logos`);
      console.log("Fetch logo Response: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch logo"
      );
    }
  }
);

export const deleteLogo = createAsyncThunk(
  "storefront/deleteLogo",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/logos/delete-logo/${id}`
      );
      console.log("Delete logo Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete logo"
      );
    }
  }
);

export const addCarousel = createAsyncThunk(
  "storefront/addCarousel",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/carousels/add-crousel`,
        data
      );
      console.log("Add Carousel Response: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add carousel"
      );
    }
  }
);

export const fetchCarousal = createAsyncThunk(
  "storefront/fetchCarousal",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/carousels/get-crousel`);
      console.log("Fetch Carousal Response: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch Carousal"
      );
    }
  }
);

// 2. Initial State
const initialState = {
  loading: false,
  error: null as string | null,
  webPages: [],
  blogs: [],
  logoData: [],
  carouselData: [],
};

// 3. Slice
const homeSlice = createSlice({
  name: "storefront",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createWebpage.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWebpage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createWebpage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add webpage";
      })
      .addCase(getWebPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWebPages.fulfilled, (state, action) => {
        state.loading = false;
        state.webPages = action?.payload;
      })
      .addCase(getWebPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to  webpage";
      })
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action?.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to  fetch blogs";
      })
      .addCase(fetchLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogo.fulfilled, (state, action) => {
        state.loading = false;
        state.logoData = action?.payload;
      })
      .addCase(fetchLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to  fetch logo";
      })
      .addCase(fetchCarousal.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarousal.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselData = action.payload;
      })
      .addCase(fetchCarousal.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Failed to  fetch Carousal";
      });
  },
});

export default homeSlice.reducer;
