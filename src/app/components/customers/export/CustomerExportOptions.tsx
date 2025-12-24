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

export default function CustomerExportOptions() {
  const { register, setValue, watch, control } = useFormContext();
  const selected = watch("template");

  return (
    <div>
      <h1 className="my-5 2xl:!text-[2.4rem]">Export template and file format options</h1>
      <div className="bg-white border p-10 rounded-md shadow-sm space-y-6">
        <div className="space-y-4">
          {/* Template */}

          <div className="flex justify-start gap-5 items-start">
            <Label className="pt-1 2xl:!text-2xl">Template</Label>
            <div className="w-[500px] border rounded-md overflow-y-auto h-[180px] bg-white text-xl">
              <div className="border-b px-3 py-1 font-semibold text-gray-600 2xl:!text-2xl">
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
                <Label className=" mb-2 2xl:!text-2xl">File format</Label>
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
                          <Label className="2xl:!text-2xl" htmlFor="csv">
                            Export to Microsoft Excel (csv)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="xml" id="xml" />
                          <Label className="2xl:!text-2xl" htmlFor="xml">
                            Export to an xml file (advanced)
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
              {/* Save export checkbox */}
              <div className="flex items-center space-x-2 pt-2 mt-10">
                <Checkbox id="saveExport" {...register("saveExport")} />
                <Label className="2xl:!text-2xl" htmlFor="saveExport">
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
