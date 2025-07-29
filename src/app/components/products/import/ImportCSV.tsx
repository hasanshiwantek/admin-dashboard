"use client";
import React, { useState, useEffect } from "react";
import ImportCsvForm from "./ImportCsvForm";
import StepTwo from "./StepTwo";
import { useForm, FormProvider } from "react-hook-form";

const ImportCsv = () => {
  const methods = useForm({
    mode: "onChange", // improves validation triggering
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
      excelHeaders: [], // ✅ needed for XLSX headers
    },
  });

  const [step, setStep] = useState<number>(1);

  // Step transition logic
  const goToNextStep = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setStep((prev) => (prev = 2));
    }
  };

  const goToPreviousStep = () => {
    setStep((prev) => (prev = 1));
  };

  // Final submit handler (only for Step 2)
  const onSubmit = (data: Record<string, any>) => {
    console.log("✅ CSV Submitted Data:", data);
  };

  useEffect(() => {
    setStep((prev) => (prev = 1));
  }, []);

  return (
    <div>
      <div className="flex flex-col space-y-5 p-6">
        <h1 className="!font-extralight">Import Products</h1>
        <p>
          Use the form below to define which import fields should map to which
          product fields.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Step 1 or 2 */}
          {step === 1 ? <ImportCsvForm /> : <StepTwo />}

          {/* Navigation Buttons */}
          <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
            {/* Previous */}
            <button
              type="button"
              className={`btn-outline-primary ${
                step === 1
                  ? "!cursor-not-allowed opacity-50"
                  : "!cursor-pointer"
              }`}
              disabled={step === 1}
              onClick={goToPreviousStep}
            >
              Previous
            </button>

            {/* Next / Submit */}
            {step === 1 ? (
              <button
                type="button"
                className="btn-primary"
                onClick={goToNextStep}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="btn-primary">
                Submit
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ImportCsv;
