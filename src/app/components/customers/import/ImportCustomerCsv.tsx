"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ImportCustomerCsv = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const selectedSource = watch("fileSource");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Import Details */}
        <div className="p-10 space-y-10">
          <div>
            <h1 className="!font-light">Import customers</h1>
            <p>
              You can import customers to your store from a csv file. We
              recommend you make a backup of your customers before running a new
              import. <span className="!text-blue-500">Learn more</span>
            </p>
          </div>
          <div>
            <h1 className="!font-semibold mb-4">Import details</h1>
            <div className="bg-white border rounded-md p-10 space-y-10 ">
              <div className="flex items-center space-x-2">
                <Checkbox id="bulkEdit" {...register("bulkEdit")} />
                <Label htmlFor="bulkEdit">
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
                      {...register("uploadFile")}
                    //   disabled={selectedSource !== "upload"}
                      className="!bg-gray-100"
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
                  id="hasHeaders"
                  defaultChecked
                  {...register("hasHeaders")}
                />
                <Label htmlFor="hasHeaders">This file contains headers</Label>
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
                {errors.separator && (
                  <p className="!text-base !text-red-500">This field is required</p>
                )}
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
                {errors.enclosure && (
                  <p className="!text-base !text-red-500">This field is required</p>
                )}
              </div>
            </div>
          </div>
        </div>

   
        <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
          <button type="button" className="btn-outline-primary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
           Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportCustomerCsv;
