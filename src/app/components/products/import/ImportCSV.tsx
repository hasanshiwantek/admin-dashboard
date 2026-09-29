"use client";
import React from "react";
import ImportCsvForm from "./ImportCsvForm";
import StepTwo from "./StepTwo";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { mappingFields } from "@/const/ImportExportData";
import { importCsv } from "@/redux/slices/productSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useRouter } from "next/navigation";
import { ImportProgressModal } from "./ImportProgressModal";
import { useAlert } from "@/hooks/useAlert";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import { Button } from "@/components/ui/button";
const ImportCsv = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      importSource: "upload",
      bulkTemplate: false,
      overwrite: false,
      detectCategories: true,
      ignoreBlanks: true,
      optionType: "Multi-choice (select)",
      hasHeader: true,
      separator: ",",
      enclosure: `"`,
    },
  });

  // Progress modal state
  const [step, setStep] = useState(1);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressKey, setProgressKey] = useState("");
  const { showAlert, Alert } = useAlert();
  // Check for ongoing import on mount AND when component becomes visible
  useEffect(() => {
    const checkOngoingImport = () => {
      const storedKey = localStorage.getItem("ongoingImportKey");

      // 🔥 If import is running, always show the modal
      if (storedKey) {
        setProgressKey(storedKey);
        setShowProgressModal(true);
      }
    };

    checkOngoingImport();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkOngoingImport();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleFinalSubmit = async (data: Record<string, any>) => {
    const {
      file,
      importSource,
      detectCategories,
      ignoreBlanks,
      optionType,
      hasHeader,
      separator,
      enclosure,
      bulkTemplate,
      overwrite,
    } = data;

    // ✅ Step 1: Print all field mappings including ignored ones
    const configKeys = [
      "file",
      "importSource",
      "detectCategories",
      "ignoreBlanks",
      "optionType",
      "hasHeader",
      "separator",
      "enclosure",
      "bulkTemplate",
      "overwrite",
    ];

    console.log("🧾 Submitted Field Mappings:");
    Object.entries(data).forEach(([key, value]) => {
      if (!configKeys.includes(key)) {
        if (value === "__ignore__") {
          console.log(`${key}: ❌ Ignored`);
        } else {
          console.log(`${key}: ✅ ${value}`);
        }
      }
    });

    // ✅ Step 2: Continue as-is with original FormData logic
    const formData = new FormData();
    if (file && file.length > 0) {
      formData.append("file", file[0]);
    }

    formData.append("importSource", importSource);
    formData.append("detectCategories", detectCategories ? "1" : "0");
    formData.append("ignoreBlanks", ignoreBlanks ? "1" : "0");
    formData.append("optionType", optionType);
    formData.append("hasHeader", hasHeader ? "1" : "0");
    formData.append("separator", separator);
    formData.append("enclosure", enclosure);
    formData.append("bulkTemplate", bulkTemplate ? "1" : "0");
    formData.append("overwrite", overwrite ? "1" : "0");

    console.log("📦 Final FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // ✅ Step 3: Dispatch stays unchanged
    try {
      const resultAction = await dispatch(importCsv(formData));
      const result = (resultAction as any).payload;

      console.log("📥 Full Response Payload:", result);

      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        console.log("✅ CSV import queued successfully");

        // Extract progress_key from the response
        const key = result?.progress_key;

        if (key) {
          console.log("🔑 Progress Key:", key);
          setProgressKey(key);
          setShowProgressModal(true);
          localStorage.setItem("ongoingImportKey", key);
          localStorage.setItem("importModalHidden", "false");
        } else {
          console.error("❌ No progress_key found in response:s", result);
          showAlert({
            title: "Import Started",
            message: "Import started but progress tracking unavailable.",
          });
        }
      } else {
        console.error("❌ Failed to import CSV:", result);
        showAlert({
          title: "Import Failed",
          message: "Failed to start import. Please try again.",
        });
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      showAlert({
        title: "Unexpected Error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const handleImportComplete = () => {
    setShowProgressModal(false);
    localStorage.removeItem("ongoingImportKey");
    localStorage.removeItem("importModalHidden");
    router.push("/manage/products/");
  };

  return (
    <>
      <div>
        <div className="p-10">
          <div className="flex flex-col space-y-5">
            <h1 className="!font-extralight 2xl:!text-5xl">Import Products</h1>
            <p className="2xl:!text-2xl">
              You can import products to your store from a CSV file. We
              recommend exporting any existing products before running an
              import.
            </p>
          </div>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data: any) => {
              if (step === 1) {
                const existingImport = localStorage.getItem("ongoingImportKey");

                // 🔒 Block new upload if import is running
                if (existingImport) {
                  showAlert({
                    title: "Import Already Running",
                    message:
                      "An import is already running. Please wait until it finishes.",
                  });
                  return;
                }

                const file = data.file;
                if (!file || file.length === 0) {
                  showAlert({
                    title: "File Upload Required",
                    message: "Please upload a file before proceeding.",
                  });
                  return;
                }

                setStep(2);
                return;
              }

              handleFinalSubmit(data);
            })}
          >
            {step === 1 ? <ImportCsvForm /> : <StepTwo />}
            <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
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
                onClick={() => setOpenConfirmationModal(true)}
              >
                Cancel
              </Button>
              {step !== 1 && (
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
                  onClick={step === 2 ? () => setStep(1) : undefined}
                >
                  Previous
                </Button>
              )}
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
                {step === 2 ? "Submit" : "Next"}
              </Button>
            </div>
          </form>
        </FormProvider>
        {/* Progress Modal */}
        <ImportProgressModal
          isOpen={showProgressModal}
          onClose={() => setShowProgressModal(false)}
          progressKey={progressKey}
          onComplete={handleImportComplete}
        />
      </div>
      <Alert />

      {openConfirmationModal && (
        <ConfirmationModal
          open={openConfirmationModal}
          onOpenChange={setOpenConfirmationModal}
          variant="warning"
          title="Confirmation"
          description="Are you sure you want to cancel importing?"
          onConfirm={() => {
            router.push("/manage/products");
          }}
        />
      )}
    </>
  );
};

export default ImportCsv;
