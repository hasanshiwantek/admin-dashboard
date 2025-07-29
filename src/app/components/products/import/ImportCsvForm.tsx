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
    <div className="p-10">
      {/* Import Source */}
      <div className="mt-2 ">
        <h1 className="mb-4">Import Products via CSV</h1>
        <div className="bg-white shadow-sm rounded-sm p-10">
          <Controller
            control={control}
            name="importSource"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload">
                    Upload a CSV file from my computer (20 MB size limit)
                  </Label>
                </div>
                <div className="ml-7">
                  <Input
                    type="file"
                    {...register("file")}
                    onChange={handleFileParse}
                    className="cursor-pointer border bg-gray-100 !text-lg"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="server" id="server" />
                  <Label htmlFor="server">
                    Use a file already on the server
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      </div>
 
      {/* Import Options */}
      <div className=" mt-5 space-y-4">
        <div className="mt-5 space-y-4">
          <h1>Import Options</h1>
          <div className="bg-white shadow-sm rounded-sm p-10 space-y-10">
            {[
              {
                name: "bulkTemplate",
                label: "File was exported using the 'Bulk Edit' template",
              },
              { name: "overwrite", label: "Overwrite existing products" },
              {
                name: "detectCategories",
                label: "Detect product categories from CSV file",
              },
              {
                name: "ignoreBlanks",
                label: "Ignore blank values during import",
              },
              { name: "hasHeader", label: "File contains headers" },
            ].map(({ name, label }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor={name}>{label}</Label>
                  </div>
                )}
              />
            ))}
 
            <div className="flex items-center space-x-1">
              <Label htmlFor="optionType" className="w-52">
                Default Option Type
              </Label>
              <Controller
                control={control}
                name="optionType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Multi-choice (select)">
                        Multi-choice (select)
                      </SelectItem>
                      <SelectItem value="Text field">Text field</SelectItem>
                      <SelectItem value="Radio buttons">
                        Radio buttons
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
 
            <div className="flex items-center space-x-3">
              <Label htmlFor="separator" className="w-56">
                Field Separator
              </Label>
              <Input
                id="separator"
                {...register("separator")}
                className="w-[100px]"
              />
            </div>
 
            <div className="flex items-center space-x-3">
              <Label htmlFor="enclosure" className="w-56">
                Field Enclosure
              </Label>
              <Input
                id="enclosure"
                {...register("enclosure")}
                className="w-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}