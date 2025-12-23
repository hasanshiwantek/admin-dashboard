"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { countriesList } from "@/const/location";

type FormValues = {
  hsCodes: {
    country: string;
    code: string;
  }[];
  manageCustoms: boolean;
  countryOfOrigin?: string;
  commodityDescription?: string;
};

export default function CustomsInformation() {
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<FormValues>(); // 👈 ADD THIS TYPE HERE

  const manageCustoms = watch("manageCustoms");

  type HsCodeEntry = {
    id: string;
    country: string;
    code: string;
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hsCodes",
  });
  const toggleCheckbox = (checked: boolean) => {
    setValue("manageCustoms", !!checked);
  };

  return (
    <div
      id="customsInformation"
      className="space-y-6 bg-white rounded-md p-10 shadow-sm"
    >
      <h1 className="2xl:!text-[2.4rem]">Customs Information</h1>
      <p className="text-muted-foreground 2xl:!text-[1.6rem]" >
        Provide customs information for this product to assist border officers
        to calculate customs duties and fees when shipping internationally. Will
        be used by installed apps that require this information.
      </p>

      {/* Toggle checkbox */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="manageCustoms"
          checked={manageCustoms}
          onCheckedChange={toggleCheckbox}
        />
        <Label className="2xl:!text-2xl" htmlFor="manageCustoms">Manage customs information</Label>
      </div>

      {/* Conditional fields */}
      {manageCustoms && (
        <div className="space-y-5">
          {/* Country of origin */}
          <div className="space-y-2">
            <Label className="2xl:!text-2xl" htmlFor="countryOfOrigin">
              Country of origin{" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Select
              onValueChange={(val) => setValue("countryOfOrigin", val)}
              defaultValue={getValues("countryOfOrigin") || ""}
            >
              <SelectTrigger className="max-w-full ">
                <SelectValue placeholder="Not specified" />
              </SelectTrigger>
              <SelectContent className="overflow-y-scroll h-96"> 
                {countriesList.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-muted-foreground 2xl:!text-2xl">
              Usually this is the country where this product was manufactured or
              produced.
            </span>
          </div>

          {/* Commodity Description */}
          <div className="space-y-2">
            <Label className="2xl:!text-2xl" htmlFor="commodityDescription">
              Commodity description <span>(optional)</span>
            </Label>
            <Textarea
              {...register("commodityDescription")}
              placeholder="Enter a description to help identify this product"
              className="w-full max-w-full h-32"
            />
            <span className="text-muted-foreground 2xl:!text-2xl">
              A succinct and precise description for border officers to identify
              and verify this product.
            </span>
          </div>

          {/* HS Codes Section */}
          <div className="space-y-2">
            <h2 className="2xl:!text-[1.6rem]">HS codes</h2>
            <p className="mb-2 2xl:!text-2xl">
              Assists border officers to classify this product.
            </p>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center flex-col 2xl:flex-row gap-4 mb-3">
                {/* Country Select */}
                <Select
                  onValueChange={(val) =>
                    setValue(`hsCodes.${index}.country`, val)
                  }
                  defaultValue={field?.country}
                  
                >
                  <SelectTrigger  className="!max-w-[100%] 2xl:!max-w-[90%] w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="overflow-y-scroll h-96">
                    {countriesList.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* HS Code Input */}
                <Input 
                   className="!max-w-[100%] 2xl:!max-w-[90%] w-full"
                  placeholder="HS Code"
                  {...register(`hsCodes.${index}.code`)}
                  // className="w-60"
                />

                {/* Delete */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="text-destructive !w-8 !h-8" />
                </Button>
              </div>
            ))}

            {/* Add Button */}
            <Button
              type="button"
              variant="link"
              className="text-blue-600 pl-0 text-xl cursor-pointer 2xl:!text-2xl"
              onClick={() => append({ country: "", code: "" })}
            >
              + HS code
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
