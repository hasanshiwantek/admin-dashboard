"use client";

import {
  useFormContext,
  Controller,
} from "react-hook-form";
import { mappingFields } from "@/const/ImportExportData";
import FieldsMapper from "./FieldsMapper";


export default function StepTwo({ }) {
  const { watch } = useFormContext();
  const excelHeaders = watch("excelHeaders") || [];

  return (
    <div className="space-y-6 p-10 bg-white/60 shadow-md rounded-sm">
        <FieldsMapper
              fields={mappingFields}
              columnOptions={excelHeaders} // e.g. ['SKU', 'Price', 'Name']
          />
    </div>
  );
}
