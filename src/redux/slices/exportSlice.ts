import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

interface ExportPayload {
  endpoint: string;
  ids: number[];
  idField: "product_ids" | "customer_ids" | "order_ids";
  filenamePrefix: string;
}

export const exportData = createAsyncThunk(
  "export/exportData",
  async (
    { endpoint, ids, idField, filenamePrefix }: ExportPayload,
    thunkAPI,
  ) => {
    try {
      const response = await axiosInstance.get(endpoint, {
        adapter: "xhr",
        params: {
          [idField]: ids,
        },
        responseType: "blob",
        signal: thunkAPI.signal,
      });
      const blob = response.data;
      const today = new Date().toISOString().slice(0, 10);

      let filename = `${filenamePrefix}-${today}.csv`;

      const disposition = response.headers["content-disposition"];

      if (disposition?.includes("filename=")) {
        filename = disposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/"/g, "")
          .trim();
      }

      return { blob, filename };
    } catch (error: any) {
      if (thunkAPI.signal.aborted) {
        return thunkAPI.rejectWithValue("Export cancelled");
      }

      return thunkAPI.rejectWithValue("Failed to export file");
    }
  },
);
export const downloadExport = async (dispatch: any, config: ExportPayload) => {
  const result = await dispatch(exportData(config)).unwrap();

  const url = URL.createObjectURL(result.blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = result.filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
