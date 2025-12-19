"use client";
import React, { useState } from "react";
import ImportTrackingCsvForm from "./ImportTrackingCsvForm";
import StepTwo from "./StepTwo";
import { useForm, FormProvider } from "react-hook-form";
import { importTrackingNumbers } from "@/redux/slices/orderSlice"; // Update this

import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useRouter } from "next/navigation";

const ImportCsv = () => {
  const methods = useForm({
    defaultValues: {
      fileSource: "upload",
      orderStatus: "Shipped",
      overrideExisting: false,
      hasHeader: true,
      separator: ",",
      enclosure: '"',
      excelHeaders: [],
    },
  });

  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleFinalSubmit = async (data: Record<string, any>) => {
    const {
      file,
      fileSource,
      orderStatus,
      overrideExisting,
      hasHeader,
      separator,
      enclosure,
      excelHeaders,
      ...fieldMappings
    } = data;

    console.log("📋 Field Mappings:", fieldMappings);

    // Create FormData
    const formData = new FormData();
    
    if (file && file.length > 0) {
      formData.append("file", file[0]);
    }

    formData.append("orderStatus", orderStatus);
    formData.append("overrideExisting", overrideExisting ? "1" : "0");
    formData.append("hasHeader", hasHeader ? "1" : "0");
    formData.append("separator", separator);
    formData.append("enclosure", enclosure);
    
    // Send field mappings as JSON string
    formData.append("fieldMappings", JSON.stringify(fieldMappings));

    console.log("📦 Final FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const resultAction = await dispatch(importTrackingNumbers(formData));
      
      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        console.log("✅ Tracking numbers imported successfully");
        router.push("/manage/orders");
      } else {
        console.error("❌ Failed to import:", (resultAction as any).payload);
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          {step === 1 ? <ImportTrackingCsvForm /> : <StepTwo />}
          
          <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4 shadow-lg">
            {step === 2 && (
              <button
                type="button"
                className="btn-outline-primary"
                onClick={() => setStep(1)}
              >
                Previous
              </button>
            )}
            <button
              type="button"
              className="btn-outline-primary"
              onClick={() => router.push("/manage/orders")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {step === 2 ? "Import" : "Next »"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ImportCsv;