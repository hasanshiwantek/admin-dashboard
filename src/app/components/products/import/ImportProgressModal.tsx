// components/ImportProgressModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

interface ImportProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  progressKey: string;
  onComplete: () => void;
}

interface ProgressData {
  current: number;
  total: number;
  status: "processing" | "completed" | "canceled" | "unknown";
}

interface DetailsData {
  imported: number;
  notImported: number;
  duplicate: number;
  updated: number;
  notUpdated: number;
}

export const ImportProgressModal: React.FC<ImportProgressModalProps> = ({
  isOpen,
  onClose,
  progressKey,
  onComplete,
}) => {
  const [progress, setProgress] = useState<ProgressData>({
    current: 0,
    total: 0,
    status: "unknown",
  });

  const [details, setDetails] = useState<DetailsData>({
    imported: 0,
    notImported: 0,
    duplicate: 0,
    updated: 0,
    notUpdated: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);

  useEffect(() => {
    if (!isOpen || !progressKey) return;

    const pollProgress = async () => {
      try {
        const response = await axiosInstance.get(
          `dashboard/products/import-progress/${progressKey}`
        );
        const data = response.data;

        setProgress({
          current: data.current || 0,
          total: data.total || 0,
          status: data.status || "processing",
        });

        setDetails({
          imported: data.imported || 0,
          notImported: data.not_imported || 0,
          duplicate: data.duplicate || 0,
          updated: data.updated || 0,
          notUpdated: data.not_updated || 0,
        });

        setIsLoading(false);

        if (
          data.status === "completed" ||
          data.status === "finished" ||
          data.status === "canceled" ||
          (data.total > 0 && data.current >= data.total)
        ) {
          clearInterval(intervalId);
          if (data.status === "completed") {
            setTimeout(onComplete, 1500);
          }
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
        setIsLoading(false);
      }
    };

    pollProgress();
    const intervalId = setInterval(pollProgress, 2000); // ✅ use const

    return () => clearInterval(intervalId);
  }, [isOpen, progressKey, onComplete]);

  const handleCancelImport = async () => {
    if (!progressKey) return;
    setIsCanceling(true);

    // try {
    //   const response = await axiosInstance.post(
    //     `dashboard/products/cancel-import`,
    //     { progress_key: progressKey }
    //   );

    //   console.log("Cancel Response:", response.data);
    //   toast.success(response.data.message || "Import canceled successfully");

    setProgress((prev) => ({ ...prev, status: "canceled" }));
    setIsCanceling(false);
    onClose();
  };
  // catch (error) {
  //   console.error("Failed to cancel import:", error);
  //   toast.error("Failed to cancel import. Try again.");
  //   setIsCanceling(false);
  // }
  //   };

  if (!isOpen) return null;

  const percentage =
    progress.total > 0
      ? Math.min(Math.round((progress.current / progress.total) * 100), 100)
      : 0;

  return (
    <div className="fixed inset-0 bg-white/70 bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4 shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Product Import
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Hide (import will continue in background)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          You can hide this window and your products will continue importing in
          the background.
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-gray-700">{percentage}%</span>
            <span className="text-gray-600">
              Importing product {progress.current}/{progress.total || "..."}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all duration-500 ease-out flex items-center justify-center ${
                progress.status === "canceled" ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${percentage}%` }}
            >
              {percentage > 10 && (
                <span className="text-xs text-white font-medium">
                  {percentage}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        {!isLoading && progress.total > 0 && (
          <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="flex justify-between">
              <span>Imported:</span>
              <span className="font-semibold text-green-600">
                {details.imported}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Not Imported:</span>
              <span className="font-semibold text-red-600">
                {details.notImported}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Duplicates:</span>
              <span className="font-semibold text-yellow-600">
                {details.duplicate}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Updated:</span>
              <span className="font-semibold text-blue-600">
                {details.updated}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Not Updated:</span>
              <span className="font-semibold text-gray-600">
                {details.notUpdated}
              </span>
            </p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-b-blue-600 border-gray-300"></div>
            <p className="mt-2 text-sm text-gray-600">Initializing import...</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-xl"
          >
            Hide
          </button>

          {progress.status !== "completed" &&
            progress.status !== "canceled" && (
              <button
                onClick={handleCancelImport}
                disabled={isCanceling}
                className={`px-4 py-2 rounded-lg font-medium text-white transition-colors text-lg  ${
                  isCanceling
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isCanceling ? "Canceling..." : "Cancel Import"}
              </button>
            )}

          {progress.status === "completed" && (
            <button
              onClick={onComplete}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              View Products
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
