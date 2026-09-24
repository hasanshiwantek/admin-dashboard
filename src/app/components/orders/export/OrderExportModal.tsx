"use client";

import { downloadFile } from "@/lib/utils";
import { useEffect } from "react";
import { OrderExportModalProps } from "./constant";


export default function OrderExportModal({
    open,
    status,
    progress,
    fileBlob,
    fileName = "Orders.csv",
    errorMessage,
    onClose,
    onStartExport,
}: OrderExportModalProps) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const handleDownloadClick = () => {
        if (!fileBlob) return;
        downloadFile(fileBlob, fileName);
        onClose()
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-modal-title"
        >
            <div
                className="w-full max-w-[560px] overflow-hidden rounded-sm bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between bg-[#2d2f45] px-5 py-3">
                    <h2
                        id="export-modal-title"
                        className="text-[17px] font-semibold !text-white"
                    >
                        Start Export
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl leading-none text-white/80 hover:text-white"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div className="min-h-[140px] px-8 py-8 text-[15px] text-gray-600">
                    {status === "confirm" && (
                        <p>
                            When your export is done, you&apos;ll get a link to download it as
                            a csv file.
                        </p>
                    )}

                    {status === "processing" && (
                        <div>
                            <p className="mb-6">
                                Your Orders export is currently being processed. Once the export
                                is complete you will be able to download it.
                            </p>
                            <div className="mx-auto w-[70%]">
                                <div className="h-[22px] overflow-hidden rounded-sm border border-gray-300 bg-white">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-300"
                                        style={{
                                            width: `${Math.min(100, Math.max(0, progress))}%`,
                                        }}
                                    />
                                </div>
                                <p className="mt-1 text-center text-sm text-gray-500">
                                    {progress}%
                                </p>
                                <p className="text-center text-sm text-gray-500">
                                    Generating Orders...
                                </p>
                            </div>
                        </div>
                    )}

                    {status === "ready" && (
                        <div>
                            <p className="mb-5">
                                Your Orders export has been generated and is ready to download.
                            </p>
                            <button
                                type="button"
                                onClick={handleDownloadClick}
                                disabled={!fileBlob}
                                className="inline-flex items-center gap-2 text-[15px] text-[#2b6cb0] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="text-lg" aria-hidden>
                                    💾
                                </span>
                                Download my Orders file
                            </button>
                        </div>
                    )}

                    {status === "error" && (
                        <p className="text-red-600">
                            {errorMessage || "Export failed. Please try again."}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-end gap-6 border-t border-gray-100 bg-[#f7f8fb] px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[15px] text-[#7a8aa0] hover:text-gray-700"
                    >
                        Close
                    </button>

                    {status === "confirm" && (
                        <button
                            type="button"
                            onClick={onStartExport}
                            className="rounded bg-[#3b6ef5] px-4 py-2 text-[15px] font-medium text-white hover:bg-[#2f5de0]"
                        >
                            Start export
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}