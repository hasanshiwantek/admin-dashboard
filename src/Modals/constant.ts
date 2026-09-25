
export enum ExportModalStatus {
    Confirm = "confirm",
    Processing = "processing",
    Ready = "ready",
    Error = "error",
}
export interface ExportModalProps {
    open: boolean;
    status: ExportModalStatus;
    progress: number;
    fileBlob?: Blob | null;
    fileName?: string;
    errorMessage?: string;
    confirmMessage?: React.ReactNode;
    processingMessage?: React.ReactNode;
    readyMessage?: React.ReactNode;
    processingLabel?: string;
    entityName?: string;
    onClose: () => void;
    onStartExport: () => void;
}