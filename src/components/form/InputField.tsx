"use client";

import { Input as BasicInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ValidationError } from "@/components/ui/validation-error";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { useFormContext } from "./Form";

type InputFieldBaseProps<T extends FieldValues, C extends ElementType> = {
  name: FieldPath<T>;
  control?: Control<T, any, any>;
  Component?: C;
  isTextArea?: boolean;
  label?: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  layout?: "horizontal" | "vertical";
  valuePropName?: string;
  changePropName?: string;
  containerClassName?: string;
  labelClassName?: string;
  controlClassName?: string;
};

export type InputFieldProps<
  T extends FieldValues,
  C extends ElementType,
> = InputFieldBaseProps<T, C> &
  Omit<
    ComponentPropsWithoutRef<C>,
    keyof InputFieldBaseProps<T, C> | "value" | "onChange" | "onBlur"
  >;

export function InputField<
  T extends FieldValues,
  C extends ElementType = typeof BasicInput,
>({
  name,
  control,
  Component = BasicInput as C,
  label,
  required,
  hint,
  layout = "horizontal",
  valuePropName = "value",
  changePropName = "onChange",
  containerClassName,
  labelClassName,
  controlClassName,
  isTextArea,
  ...componentProps
}: InputFieldProps<T, C>) {
  const formContext = useFormContext<T>();
  const { field, fieldState } = useController<T>({
    name,
    control: control ?? formContext?.control,
  });

  const id = `field-${String(name).replace(/\./g, "-")}`;
  const horizontal = layout === "horizontal";
  const FieldControl = isTextArea ? Textarea : Component;

  return (
    <div
      className={cn(
        horizontal
          ? "grid grid-cols-[14rem_1fr] 2xl:grid-cols-[18rem_1fr] items-start gap-x-8"
          : "flex flex-col gap-2",
        containerClassName,
      )}
    >
      {label ? (
        <Label
          htmlFor={id}
          className={cn(
            "font-normal text-gray-600 2xl:text-2xl!",
            horizontal && "justify-end text-right pt-3",
            labelClassName,
          )}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      ) : (
        horizontal && <span />
      )}
      <div className={cn("flex flex-col gap-2 min-w-0", controlClassName)}>
        <FieldControl
          {...componentProps}
          id={id}
          aria-invalid={!!fieldState.error}
          name={field.name}
          ref={field.ref}
          onBlur={field.onBlur}
          {...{
            // Native inputs must stay controlled, so they get "" instead of null.
            [valuePropName]:
              field.value ?? (valuePropName === "value" ? "" : undefined),
            [changePropName]: field.onChange,
          }}
        />
        {fieldState.error ? (
          <ValidationError message={fieldState.error.message} />
        ) : (
          hint && <p className="text-base text-gray-500">{hint}</p>
        )}
      </div>
    </div>
  );
}

export default InputField;
