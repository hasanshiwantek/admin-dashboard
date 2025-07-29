"use client";
import React from "react";
import ImportCsvForm from "./ImportCsvForm";
import { useForm, FormProvider } from "react-hook-form";

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


  const onSubmit = async (data: Record<string, any>) => {
    console.log("Csv Data: ", data);
  };
  return (
    <>
      <div className="p-10">
        <div className="flex flex-col space-y-5">
          <h1 className="!font-extralight">Import Products</h1>
          <p>
            You can import products to your store from a CSV file. We recommend
            exporting any existing products before running an import.
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ImportCsvForm />

            <div className="flex justify-end  gap-10 items-center fixed w-full bottom-0 right-0  bg-white/90 z-10 shadow-xs border-t  p-4">
              <button className="btn-outline-primary" type="button">Cancel</button>
              <button className="btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ImportCsv;
