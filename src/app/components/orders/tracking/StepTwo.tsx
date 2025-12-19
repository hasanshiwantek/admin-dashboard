"use client";

import { useFormContext } from "react-hook-form";
import { TrackingMappingFields } from "@/const/ImportExportData";
import FieldsMapper from "./FieldsMapper";

export default function StepTwo() {
  const { watch } = useFormContext();
  const excelHeaders = watch("excelHeaders") || [];

  return (
    <div className="p-10 space-y-8 bg-gray-50">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-normal text-gray-800">
          Map CSV fields to tracking data
        </h1>
        <p className="text-gray-600">
          Match the columns from your CSV file to the corresponding fields in your store.
          Fields marked as "Ignore" will not be imported.
        </p>
      </div>

      {/* Mapping Section */}
      <div className="bg-white border rounded-md shadow-sm">
        <div className="p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Field Mapping
          </h2>
          <FieldsMapper
            fields={TrackingMappingFields}
            columnOptions={excelHeaders}
          />
        </div>
      </div>
    </div>
  );
}