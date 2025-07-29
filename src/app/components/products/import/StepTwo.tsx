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
    <div className="space-y-6 p-10">
        <FieldsMapper
              fields={mappingFields}
              columnOptions={excelHeaders} // e.g. ['SKU', 'Price', 'Name']
          />
    </div>
  );
}
