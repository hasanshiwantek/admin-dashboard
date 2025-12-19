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
import { useFormContext } from "react-hook-form";
import { FaCircleQuestion } from "react-icons/fa6";

export type ImportFormValues = {
  importSource: "upload" | "server";
  file?: FileList;
  orderStatus: string;
  overrideExisting: boolean;
  hasHeader: boolean;
  separator: string;
  enclosure: string;
};

export default function ImportTrackingCsvForm() {
  const { register, setValue, watch } = useFormContext();

  const orderStatuses = [
    "Pending",
    "Awaiting Payment",
    "Awaiting Fulfillment",
    "Awaiting Shipment",
    "Awaiting Pickup",
    "Partially Shipped",
    "Completed",
    "Shipped",
    "Cancelled",
    "Declined",
    "Refunded",
    "Disputed",
    "Manual Verification Required",
    "Partially Refunded",
  ];

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
    <div className="p-10 space-y-8 bg-gray-50">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-normal text-gray-800">
          Import tracking numbers
        </h1>
        <p className="text-gray-600">
          You can import tracking numbers to your store from a csv file on your
          computer or server.
        </p>
      </div>

      {/* Order Status Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Order status details
        </h2>
        <div className="bg-white border rounded-md p-8">
          <div className="flex items-center gap-4">
            <Label className="w-48 text-gray-700">Update order status to</Label>
            <div className="flex items-center gap-2 flex-1">
              <Select
                onValueChange={(value) => setValue("orderStatus", value)}
                defaultValue="Shipped"
              >
                <SelectTrigger className="max-w-md">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {orderStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FaCircleQuestion className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Import Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Import details</h2>
        <div className="bg-white border rounded-md p-8">
          <div className="flex items-center gap-4">
            <Label className="w-48 text-gray-700">
              Override existing details
            </Label>
            <div className="flex items-center gap-2">
              <Checkbox
                id="overrideExisting"
                {...register("overrideExisting")}
              />
              <Label
                htmlFor="overrideExisting"
                className="font-normal cursor-pointer"
              >
                Yes, override existing records
              </Label>
              <FaCircleQuestion className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* File Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">File details</h2>
        <div className="bg-white border rounded-md p-8 space-y-6">
          {/* Import File */}
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <Label className="w-48 text-gray-700 pt-2">Import file</Label>
              <RadioGroup
                defaultValue="upload"
                onValueChange={(value) => setValue("fileSource", value)}
                className="flex-1 space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upload" id="upload" />
                    <Label
                      htmlFor="upload"
                      className="font-normal cursor-pointer"
                    >
                      Upload a csv file from my computer (512 MB size limit)
                    </Label>
                  </div>
                  <div className="ml-6">
                    <Input
                      type="file"
                      accept=".csv"
                      {...register("file")}
                      onChange={handleFileParse}
                      className="cursor-pointer max-w-md"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="server" id="server" />
                  <Label
                    htmlFor="server"
                    className="font-normal cursor-pointer"
                  >
                    Use a file already on the server
                  </Label>
                  <FaCircleQuestion className="text-gray-400" />
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Contains Headers */}
          <div className="flex items-center gap-4">
            <Label className="w-48 text-gray-700">
              Import file contains headers
            </Label>
            <div className="flex items-center gap-2">
              <Checkbox
                id="hasHeader"
                defaultChecked
                {...register("hasHeader")}
              />
              <FaCircleQuestion className="text-gray-400" />
            </div>
          </div>

          {/* Field Separator */}
          <div className="flex items-center gap-4">
            <Label htmlFor="separator" className="w-48 text-gray-700">
              Field separator
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="separator"
                placeholder=","
                defaultValue=","
                {...register("separator", { required: true })}
                className="max-w-xs"
              />
              <FaCircleQuestion className="text-gray-400" />
            </div>
          </div>

          {/* Field Enclosure */}
          <div className="flex items-center gap-4">
            <Label htmlFor="enclosure" className="w-48 text-gray-700">
              Field enclosure
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="enclosure"
                placeholder={`"`}
                defaultValue={`"`}
                {...register("enclosure", { required: true })}
                className="max-w-xs"
              />
              <FaCircleQuestion className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
