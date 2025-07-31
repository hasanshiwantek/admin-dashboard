"use client";

import {
  useFormContext,
  Controller,
} from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MappingField } from "@/types/types";

// type MappingField = {
//   label: string;
//   type: "dropdown" | "radio-dropdown";
//   options?: string[]; // For radio
// };

type Props = {
  fields: MappingField[];
  columnOptions: string[]; // From uploaded Excel
};

export default function FieldsMapper({ fields, columnOptions }: Props) {
  const { control, watch } = useFormContext();

  return (
    <div className="space-y-10 p-10">
      {fields.map((field, index) => {
        const defaultMatch = columnOptions.find(col =>
          col.toLowerCase().includes(field.label.toLowerCase())
        );
        const radioValue = watch(`${field.label}_mode`);

        return (
          <div key={index} className="flex  gap-2 ">
            <Label className="font-semibold w-44">{field.label}</Label>

            {field.type === "radio-dropdown" ? (
              <>
                <Controller
                  control={control}
                  name={`${field.label}_mode`}
                  defaultValue={defaultMatch || ""}
                  render={({ field: radioField }) => (
                    <RadioGroup
                      value={radioField.value}
                      onValueChange={radioField.onChange}
                    >
                      {field.options?.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${field.label}-${idx}`} />
                          <Label htmlFor={`${field.label}-${idx}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />

                {radioValue && (
                  <Controller
                    control={control}
                    name={field.label}
                    defaultValue={defaultMatch || ""}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>
                        <SelectContent>
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
              </>
            ) : (
              <Controller
                control={control}
                name={field.label}
                defaultValue={defaultMatch || ""}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
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