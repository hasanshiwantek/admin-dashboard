import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
  baseURL: string | null;
}

const initialState: ConfigState = {
  baseURL: typeof window !== 'undefined' ? localStorage.getItem('baseURL') : null,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setBaseURL: (state, action: PayloadAction<string>) => {
      state.baseURL = action.payload;
      localStorage.setItem('baseURL', action.payload);
    },
    clearBaseURL: (state) => {
      state.baseURL = null;
      localStorage.removeItem('baseURL');
    },
  },
});

export const { setBaseURL, clearBaseURL } = configSlice.actions;
export default configSlice.reducer;
