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
const ImportCsv = () => {
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

  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const router = useRouter();
  // Progress modal state
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressKey, setProgressKey] = useState("");

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
        } else {
          console.error("❌ No progress_key found in response:", result);
          alert("Import started but progress tracking unavailable");
        }
      } else {
        console.error("❌ Failed to import CSV:", result);
        alert("Failed to start import. Please try again.");
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleImportComplete = () => {
    setShowProgressModal(false);
    router.push("/manage/products/");
  };
  return (
    <>
      <div>
        <div className="p-10">
          <div className="flex flex-col space-y-5">
            <h1 className="!font-extralight">Import Products</h1>
            <p>
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
                const file = data.file;
                if (!file || file.length === 0) {
                  alert("Please upload a file before proceeding.");
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
              <button
                type="button"
                className="btn-outline-primary"
                onClick={step === 2 ? () => setStep(1) : undefined}
              >
                Previous
              </button>
              <button type="submit" className="btn-primary">
                {step === 2 ? "Submit" : "Next"}
              </button>
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
    </>
  );
};

export default ImportCsv;
