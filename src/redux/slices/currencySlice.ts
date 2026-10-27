import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import type {
  CountryOption,
  CurrenciesResponse,
  Currency,
  CurrencyOption,
  CurrencyResponse,
  DefaultCurrency,
  DefaultCurrencyResponse,
  ListResponse,
  CurrencyPayload,
  CurrentRateParams,
  CurrentRateResponse,
} from "@/app/(protected)/manage/settings/(setup)/currencies/type";

const CURRENCIES_ENDPOINT = "dashboard/currencies";

export const fetchCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get<CurrenciesResponse>(
        CURRENCIES_ENDPOINT
      );
      const { default: defaultCurrency, additional } = res.data?.data ?? {};
      return [
        ...(defaultCurrency ? [defaultCurrency] : []),
        ...(additional ?? []),
      ] as Currency[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch currencies"
      );
    }
  }
);

export const fetchCurrencyById = createAsyncThunk(
  "currency/fetchCurrencyById",
  async (id: number, thunkAPI) => {
    try {
      const res = await axiosInstance.get<CurrencyResponse>(
        `${CURRENCIES_ENDPOINT}/${id}`
      );
      return res.data?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch currency"
      );
    }
  }
);

export const fetchDefaultCurrency = createAsyncThunk(
  "currency/fetchDefaultCurrency",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get<DefaultCurrencyResponse>(
        `${CURRENCIES_ENDPOINT}/default`
      );
      return res.data?.data ?? null;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch default currency"
      );
    }
  }
);

export const createCurrency = createAsyncThunk(
  "currency/createCurrency",
  async (data: CurrencyPayload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(CURRENCIES_ENDPOINT, data);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add currency"
      );
    }
  }
);

export const updateCurrency = createAsyncThunk(
  "currency/updateCurrency",
  async ({ id, data }: { id: number; data: CurrencyPayload }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`${CURRENCIES_ENDPOINT}/${id}`, data);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update currency"
      );
    }
  }
);

export const setDefaultCurrency = createAsyncThunk(
  "currency/setDefaultCurrency",
  async (id: number, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `${CURRENCIES_ENDPOINT}/${id}/set-default`
      );
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to set default currency"
      );
    }
  }
);

export const deleteCurrency = createAsyncThunk(
  "currency/deleteCurrency",
  async (id: number, thunkAPI) => {
    try {
      await axiosInstance.delete(`${CURRENCIES_ENDPOINT}/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete currency"
      );
    }
  }
);

export const fetchCurrencyOptions = createAsyncThunk(
  "currency/fetchCurrencyOptions",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get<ListResponse<CurrencyOption>>(
        `${CURRENCIES_ENDPOINT}/options`
      );
      return res.data?.data ?? [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch currency options"
      );
    }
  }
);

export const fetchCurrencyCountries = createAsyncThunk(
  "currency/fetchCurrencyCountries",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get<ListResponse<CountryOption>>(
        `${CURRENCIES_ENDPOINT}/countries`
      );
      return res.data?.data ?? [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch countries"
      );
    }
  }
);

export const fetchCurrentRate = createAsyncThunk(
  "currency/fetchCurrentRate",
  async (params: CurrentRateParams, thunkAPI) => {
    try {
      const res = await axiosInstance.get<CurrentRateResponse>(
        `${CURRENCIES_ENDPOINT}/current-rate`,
        { params }
      );
      const rate = Number(res.data?.rate);
      if (!res.data?.status || !rate) {
        return thunkAPI.rejectWithValue("Failed to fetch current rate");
      }
      return rate;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch current rate"
      );
    }
  }
);

const initialState = {
  currencies: [] as Currency[],
  currenciesLoading: false,
  defaultCurrency: null as DefaultCurrency | null,
  selectedCurrency: null as Currency | null,
  selectedCurrencyLoading: false,
  currencySaving: false,
  currencyOptions: [] as CurrencyOption[],
  currencyOptionsLoading: false,
  countries: [] as CountryOption[],
  currentRateLoading: false,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyById.pending, (state) => {
        state.selectedCurrencyLoading = true;
      })
      .addCase(fetchCurrencyById.fulfilled, (state, action) => {
        state.selectedCurrencyLoading = false;
        state.selectedCurrency = action.payload ?? null;
      })
      .addCase(fetchCurrencyById.rejected, (state) => {
        state.selectedCurrencyLoading = false;
      })
      .addCase(fetchDefaultCurrency.pending, (state) => {
        state.defaultCurrency = null;
      })
      .addCase(fetchDefaultCurrency.fulfilled, (state, action) => {
        state.defaultCurrency = action.payload;
      })
      .addCase(fetchCurrencies.pending, (state) => {
        state.currenciesLoading = true;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.currenciesLoading = false;
        state.currencies = action.payload ?? [];
      })
      .addCase(fetchCurrencies.rejected, (state) => {
        state.currenciesLoading = false;
      })
      .addCase(createCurrency.pending, (state) => {
        state.currencySaving = true;
      })
      .addCase(createCurrency.fulfilled, (state) => {
        state.currencySaving = false;
      })
      .addCase(createCurrency.rejected, (state) => {
        state.currencySaving = false;
      })
      .addCase(updateCurrency.pending, (state) => {
        state.currencySaving = true;
      })
      .addCase(updateCurrency.fulfilled, (state) => {
        state.currencySaving = false;
      })
      .addCase(updateCurrency.rejected, (state) => {
        state.currencySaving = false;
      })
      .addCase(deleteCurrency.fulfilled, (state, action) => {
        state.currencies = state.currencies.filter(
          (currency) => currency.id !== action.payload
        );
      })
      .addCase(fetchCurrencyOptions.pending, (state) => {
        state.currencyOptionsLoading = true;
      })
      .addCase(fetchCurrencyOptions.fulfilled, (state, action) => {
        state.currencyOptionsLoading = false;
        state.currencyOptions = action.payload ?? [];
      })
      .addCase(fetchCurrencyOptions.rejected, (state) => {
        state.currencyOptionsLoading = false;
      })
      .addCase(fetchCurrencyCountries.fulfilled, (state, action) => {
        state.countries = action.payload ?? [];
      })
      .addCase(fetchCurrentRate.pending, (state) => {
        state.currentRateLoading = true;
      })
      .addCase(fetchCurrentRate.fulfilled, (state) => {
        state.currentRateLoading = false;
      })
      .addCase(fetchCurrentRate.rejected, (state) => {
        state.currentRateLoading = false;
      });
  },
});

export default currencySlice.reducer;
