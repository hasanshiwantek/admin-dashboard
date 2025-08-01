"use client";
import React from "react";
import ImportCsvForm from "./ImportCsvForm";
import StepTwo from "./StepTwo";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { mappingFields } from "@/const/ImportExportData";
import { importCsv } from "@/redux/slices/productSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";

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

    const formData = new FormData();
    if (file && file.length > 0) {
      formData.append("file", file[0]); // ✅ file is usually a FileList
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

    try {
      const resultAction = await dispatch(importCsv(formData)); // ✅ pass formData directly
      const result = (resultAction as any).payload;

      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        console.log("✅ CSV imported successfully:", result);
      } else {
        console.error("❌ Failed to import CSV:", result);
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
    }
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
      </div>
    </>
  );
};

export default ImportCsv;
