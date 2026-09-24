// configSlice.ts
import { LocalStorageKeys } from "@/const/appConstants";
import {
  getFromStorage,
  removeFromStorage,
  setInStorage,
} from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StoreObject {
  id?: number;
  storeId?: number;
  name?: string;
  [key: string]: any;
}

const findStoreById = (storeId: number): StoreObject | null =>
  getFromStorage<StoreObject[]>(LocalStorageKeys.AvailableStores, [])?.find(
    (store) => Number(store.id ?? store.storeId) === storeId,
  ) ?? null;

interface ConfigState {
  storeId: number | null;
  currentStore: StoreObject | null;
}

const initialState: ConfigState = {
  storeId: getFromStorage<number>(LocalStorageKeys.StoreId),
  currentStore: getFromStorage<StoreObject>(LocalStorageKeys.CurrentStore),
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setStoreId: (state, action: PayloadAction<number>) => {
      const currentStore = findStoreById(action.payload);
      state.storeId = action.payload;
      state.currentStore = currentStore;
      setInStorage(LocalStorageKeys.StoreId, action.payload);
      setInStorage(LocalStorageKeys.CurrentStore, currentStore);
    },
    clearStoreId: (state) => {
      state.storeId = null;
      state.currentStore = null;
      removeFromStorage(LocalStorageKeys.StoreId);
      removeFromStorage(LocalStorageKeys.CurrentStore);
    },
  },
});

export const { setStoreId, clearStoreId } = configSlice.actions;
export default configSlice.reducer;
