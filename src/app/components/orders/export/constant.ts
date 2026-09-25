export enum ExportModalStatus {
  Confirm = "confirm",
  Processing = "processing",
  Ready = "ready",
  Error = "error",
}

export enum ExportTab {
  Options = "exportOptions",
  Preview = "exportPreview",
}

export interface OrderExportModalProps {
  open: boolean;
  status: ExportModalStatus;
  progress: number;
  fileBlob?: Blob | null;
  fileName?: string;
  errorMessage?: string | null;
  onClose: () => void;
  onStartExport: () => void;
}