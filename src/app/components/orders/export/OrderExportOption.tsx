"use client";
import React, { useEffect, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
const templates = [
  { label: "Bulk Edit", value: "bulkEdit" },
  { label: "Default", value: "default" },
];

export default function OrderExportOptions() {
  const { register, setValue, watch, control } = useFormContext();
  const selected = watch("template");

  return (
    <div>
      <h1 className="my-5">Template and File format options</h1>
      <div className="bg-white border p-10 rounded-md shadow-sm space-y-6">
        <div className="space-y-4">
          {/* Template */}

          <div className="flex justify-start gap-5 items-start">
            <Label className="pt-1">Template</Label>
            <div className="w-[500px] border rounded-md overflow-y-auto h-[180px] bg-white text-xl">
              <div className="border-b px-3 py-1 font-semibold text-gray-600">
                Built-in templates
              </div>
              {templates.map((tpl) => {
                const isSelected = selected === tpl.value;

                return (
                  <div
                    key={tpl.value}
                    onClick={() =>
                      setValue(
                        "template",
                        selected === tpl.value ? "" : tpl.value
                      )
                    }
                    className={cn(
                      "cursor-pointer px-3 py-1 ",
                      isSelected && "bg-blue-600 text-white"
                    )}
                  >
                    {tpl.label}
                  </div>
                );
              })}
              <input type="hidden" {...register("template")} />
            </div>
          </div>

          <div>
            {/* File Format */}
            <div>
              <div className="flex  justify-start gap-5">
                <Label className=" mb-2">File format</Label>
                <Controller
                  control={control}
                  name="fileFormat"
                  defaultValue="csv"
                  render={({ field }) => (
                    <RadioGroup
                      className="flex gap-10 mt-2"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex flex-col mt-10 space-y-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="csv" id="csv" />
                          <Label htmlFor="csv">Export as CSV</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="xml" id="xml" />
                          <Label htmlFor="xml">Export as XML</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
              {/* Save export checkbox */}
              <div className="flex items-center space-x-2 pt-2 mt-10">
                <Checkbox id="saveExport" {...register("saveExport")} />
                <Label htmlFor="saveExport">
                  Save export to the server for later download
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
