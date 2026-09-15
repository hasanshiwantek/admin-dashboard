"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationError } from "@/components/ui/validation-error";
import { Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

type CustomField = {
  name: string;
  value: string;
};

type FormValues = {
  customFields: CustomField[];
};

export default function CustomFields() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  return (
    <div className="bg-white p-10 shadow-lg space-y-6" id="customFields">
      <h1 className="2xl:!text-[2.4rem]">Custom Fields</h1>
      <p className="text-muted-foreground 2xl:!text-2xl">
        Custom fields allow you to specify additional information that will
        appear on the products page. Custom fields appear automatically in the
        product's details if they are defined on the product. If you don't want
        to show any custom fields, simply remove them from the product.
      </p>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col 2xl:flex-row items-start 2xl:items-end gap-4"
        >
          <div className="w-1/2">
            <Label
              className="2xl:!text-2xl"
              htmlFor={`customFields.${index}.name`}
            >
              Custom Field Name <span className="!text-red-500">*</span>
            </Label>
            <Input
              className="!max-w-[90%] w-full"
              id={`customFields.${index}.name`}
              placeholder="e.g. Wine Vintage"
              {...register(`customFields.${index}.name` as const)}
            />
            <ValidationError
              className="mt-1"
              message={errors.customFields?.[index]?.name?.message}
            />
          </div>

          <div className="w-1/2">
            <Label
              className="2xl:!text-2xl"
              htmlFor={`customFields.${index}.value`}
            >
              Custom Field Value <span className="!text-red-500">*</span>
            </Label>
            <Input
              className="!max-w-[90%] w-full"
              id={`customFields.${index}.value`}
              placeholder="1998"
              {...register(`customFields.${index}.value` as const)}
            />
            <ValidationError
              className="mt-1"
              message={errors.customFields?.[index]?.value?.message}
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            className="text-red-500 "
            onClick={() => remove(index)}
          >
            <Trash2 className="!w-6 !h-6" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="link"
        onClick={() => append({ name: "", value: "" })}
        className="text-xl text-blue-600 cursor-pointer 2xl:!text-2xl"
      >
        + Add Custom Fields
      </Button>
    </div>
  );
}
