"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { exportOrderCsv } from "@/redux/slices/orderSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useSearchParams } from "next/navigation";
import { ExportTab, ExportModalStatus } from "@/types/types";
import { Button } from "@/components/ui/button";
import ExportModal from "@/Modals/ExportModal";
import CustomerExportOptions from "./CustomerExportOptions";
import CustomerExportPreview from "./CustomerExportPreview";

export default function CustomerExportPage() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<ExportTab>(ExportTab.Options);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<ExportModalStatus>(ExportModalStatus.Confirm);
  const [progress, setProgress] = useState(0);
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState("Customers.csv");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      template: "",
      fileFormat: "csv",
      saveExport: false,
    },
  });

  const closeModal = () => {
    setModalOpen(false);
    setProgress(0);
    setErrorMessage(null);
    setModalStatus(ExportModalStatus.Confirm);
  };
  const startExport = async () => {
    const data = form.getValues();
    setModalStatus(ExportModalStatus.Processing);
    setProgress(0);
    setErrorMessage(null);
    setFileBlob(null);

    try {
      const resultAction = await dispatch(
        exportOrderCsv({
          payload: data,
          onProgress: (percent) => setProgress(percent),
        }),
      );
      const result = (resultAction as any).payload;

      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        setProgress(100);
        setFileBlob(result.blob);
        setFileName(result.filename || `customers.${data.fileFormat || "csv"}`);
        setModalStatus(ExportModalStatus.Ready);
      } else {
        setModalStatus(ExportModalStatus.Error);
        setErrorMessage(result?.message || result?.error || "Export failed.");
      }
    } catch (error) {
      setModalStatus(ExportModalStatus.Error);
      setErrorMessage("Unexpected export error.");
      console.error("❌ Unexpected Export Error:", error);
    }
  };

  const onSubmit = () => {
    setModalStatus(ExportModalStatus.Confirm);
    setProgress(0);
    setFileBlob(null);
    setErrorMessage(null);
    setModalOpen(true);
  };

  useEffect(() => {
    if (!searchParams.get("t")) return;
    setActiveTab(ExportTab.Options);
  }, [searchParams]);

  return (
    <FormProvider {...form}>
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="border-b border-gray-200">
            <h1 className="!font-extralight 2xl:!text-5xl">Export customers</h1>
            <p className="my-5 2xl:!text-2xl">
              Select an export template or create a new one.
            </p>

            <nav className="flex space-x-4 mt-5">
              <button
                type="button"
                onClick={() => setActiveTab(ExportTab.Options)}
                className={`px-4 py-2 text-xl border-b-4 transition-colors 2xl:!text-2xl ${activeTab === "exportOptions"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Export options
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(ExportTab.Preview)}
                className={`px-4 py-2 text-xl border-b-4 transition-colors 2xl:!text-2xl ${activeTab === "exportPreview"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Export preview
              </button>
            </nav>
          </div>
          <div className="fixed bottom-0 right-0 z-10 flex w-full items-center justify-end gap-4 border-t bg-white/90 p-4 shadow-xs">
            <Button
              type="button"
              className="
              h-[42px]
              min-w-[82px]
              mr-[14px]
              rounded-none
              bg-transparent
              px-[14px]
              text-[16px]
              font-normal
              text-[#526dff]
              shadow-none
              hover:bg-transparent
              hover:text-[#526dff]
            "
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="
              h-[42px]
              min-w-[112px]
              rounded-none
              bg-[#4d70ff]
              px-[22px]
              text-[16px]
              font-normal
              text-white
              shadow-none
              hover:bg-[#4164f5]
            "
            >
              Continue
            </Button>
          </div>

          <div className="p-20">
            {activeTab === ExportTab.Options && <CustomerExportOptions />}
            {activeTab === ExportTab.Preview && <CustomerExportPreview />}
          </div>
        </form>
        <ExportModal
          open={modalOpen}
          status={modalStatus}
          progress={progress}
          fileBlob={fileBlob}
          fileName="customers.csv"
          processingMessage={
            <>
              Your Customers export is currently being processed. Once the export is
              complete you will be able to download it.
            </>
          }
          entityName="Customers"
          processingLabel="Generating Customers..."
          onClose={closeModal}
          onStartExport={startExport}
        />
      </div>
    </FormProvider >
  );
}