"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import * as XLSX from "xlsx";

import { useForm, Controller, useFormContext } from "react-hook-form";

export type ImportFormValues = {
  importSource: "upload" | "server";
  file?: FileList;
  bulkTemplate: boolean;
  overwrite: boolean;
  detectCategories: boolean;
  ignoreBlanks: boolean;
  optionType: string;
  hasHeader: boolean;
  separator: string;
  enclosure: string;
};

export default function ImportCsvForm() {
  const { register, control, setValue } = useFormContext();

  const handleFileParse = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = json[0] as string[];
    setValue("excelHeaders", headers);
  };

  return (
    <div className="p-15">
      {/* Import Source */}
      <div className="p-10 space-y-10">
        <div>
          <h1 className="!font-light">Import customers</h1>
          <p>
            You can import customers to your store from a csv file. We recommend
            you make a backup of your customers before running a new import.{" "}
            <span className="!text-blue-500">Learn more</span>
          </p>
        </div>
        <div>
          <h1 className="!font-semibold mb-4">Import details</h1>
          <div className="bg-white border rounded-md p-10 space-y-10 ">
            <div className="flex items-center space-x-2">
              <Checkbox id="bulkTemplate" {...register("bulkTemplate")} />
              <Label htmlFor="bulkTemplate">
                File was exported using the ‘Bulk Edit’ template
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="override" {...register("override")} />
              <Label htmlFor="override">Override existing records</Label>
            </div>
          </div>
        </div>

        {/* File Details */}
        <div>
          <h1 className="!font-semibold mb-4">File details</h1>
          <div className="bg-white border rounded-md p-10 space-y-6 ">
            {/* File Source */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Import file</Label>
              <RadioGroup
                defaultValue="upload"
                onValueChange={(value) => setValue("fileSource", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload">
                    Upload a csv file from my computer (2MB size limit)
                  </Label>
                </div>
                <div className="ml-6">
                  <Input
                    type="file"
                    {...register("file")}
                    onChange={handleFileParse}
                    className="cursor-pointer border bg-gray-100 !text-lg"
                  />
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <RadioGroupItem value="server" id="server" />
                  <Label htmlFor="server">
                    Use a file already on the server
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Contains headers */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasHeader"
                defaultChecked
                {...register("hasHeader")}
              />
              <Label htmlFor="hasHeader">This file contains headers</Label>
            </div>

            {/* Field Separator */}
            <div className="space-y-1">
              <Label htmlFor="separator">
                Field separator <span className="!text-red-500">*</span>
              </Label>
              <Input
                id="separator"
                placeholder=","
                {...register("separator", { required: true })}
              />
            </div>

            {/* Field Enclosure */}
            <div className="space-y-1">
              <Label htmlFor="enclosure">
                Field enclosure <span className="!text-red-500">*</span>
              </Label>
              <Input
                id="enclosure"
                placeholder={`"`}
                {...register("enclosure", { required: true })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
