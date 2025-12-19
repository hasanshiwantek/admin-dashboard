"use client";

import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MappingField } from "@/types/types";

type Props = {
  fields: MappingField[];
  columnOptions: string[];
};

export default function FieldsMapper({ fields, columnOptions }: Props) {
  const { control, watch } = useFormContext();

  return (
    <div className="space-y-6">
      {fields.map((field, index) => {
        const defaultMatch = columnOptions.find((col) =>
          col.toLowerCase().includes(field.label.toLowerCase())
        );
        const radioValue = watch(`${field.label}_mode`);

        return (
          <div key={index} className="flex items-start gap-6 py-3 border-b last:border-0">
            <Label className="font-medium w-48 pt-2 text-gray-700">
              {field.label}
            </Label>

            {field.type === "radio-dropdown" ? (
              <div className="flex-1 space-y-4">
                <Controller
                  control={control}
                  name={`${field.label}_mode`}
                  defaultValue={field.options?.[0] || ""}
                  render={({ field: radioField }) => (
                    <RadioGroup
                      value={radioField.value}
                      onValueChange={radioField.onChange}
                      className="flex gap-6"
                    >
                      {field.options?.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={option}
                            id={`${field.label}-${idx}`}
                          />
                          <Label 
                            htmlFor={`${field.label}-${idx}`}
                            className="font-normal cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />

                {radioValue && (
                  <Controller
                    control={control}
                    name={field.label}
                    defaultValue={defaultMatch || "__ignore__"}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="max-w-md">
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__ignore__">
                            <span className="text-gray-400">— Ignore —</span>
                          </SelectItem>
                          {columnOptions.map((col) => (
                            <SelectItem key={col} value={col}>
                              {col}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}
              </div>
            ) : (
              <Controller
                control={control}
                name={field.label}
                defaultValue={defaultMatch || "__ignore__"}
                render={({ field }) => (
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="max-w-md">
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__ignore__">
                        <span className="text-gray-400">— Ignore —</span>
                      </SelectItem>
                      {columnOptions.map((col) => (
                        <SelectItem key={col} value={col}>
                          {col}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}