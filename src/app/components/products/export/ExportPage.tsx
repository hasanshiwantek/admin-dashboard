"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ExportOptions from "./ExportOption";
import ExportPreview from "./ExportPreview";

export default function ExportPage() {
  const form = useForm({
    defaultValues: {
      template: "",
      fileFormat: "csv",
      saveExport: false,
    },
  });

  const [activeTab, setActiveTab] = useState<"exportOptions" | "exportPreview">(
    "exportOptions"
  );

  const onSubmit = (data: any) => {
    console.log("Export Data:", data);
  };

  return (
    <FormProvider {...form}>
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <h1 className="!font-extralight">Export products</h1>
            <p className="my-5">
              Determine the format of your exported products by selecting an
              export template or create a new export template.
            </p>

            <nav className="flex space-x-4 mt-5">
              <button
                type="button"
                onClick={() => setActiveTab("exportOptions")}
                className={`px-4 py-2 text-xl  border-b-4 transition-colors ${
                  activeTab === "exportOptions"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Export options
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("exportPreview")}
                className={`px-4 py-2 text-xl border-b-4 transition-colors ${
                  activeTab === "exportPreview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Export preview
              </button>
            </nav>
          </div>

          <div className="flex justify-end  gap-10 items-center fixed w-full  bottom-0 right-0  bg-white/90 z-10 shadow-xs border-t  p-4">
            <button className="btn-outline-primary" type="button">
              Cancel
            </button>
            <button className="btn-primary" type="submit">
              Continue
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-20">
            {activeTab === "exportOptions" && <ExportOptions />}
            {activeTab === "exportPreview" && <ExportPreview />}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
