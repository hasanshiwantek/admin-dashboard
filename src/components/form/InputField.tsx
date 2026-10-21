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
import InputWrapper from "./InputWrapper";

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
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  errorClassName?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  startIconClassName?: string;
  endIconClassName?: string;
  inputWrapperClassName?: string;
  hideColon?: boolean;
  labelStartComponent?: ReactNode;
  labelEndComponent?: ReactNode;
  getValueOnChange?: (change: { name: FieldPath<T>; value: unknown }) => void;
  runAfterOnChange?: boolean;
};

export type FieldLabelAddon = ElementType<any>;
type FieldComponentWithAddon = { LabelAddon?: FieldLabelAddon };

const getEventValue = (input: unknown) => {
  if (input && typeof input === "object" && "target" in input) {
    const target = (input as { target: HTMLInputElement }).target;
    return target.type === "checkbox" ? target.checked : target.value;
  }
  return input;
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
  rightElement,
  leftElement,
  errorClassName,
  startIcon,
  endIcon,
  startIconClassName,
  endIconClassName,
  inputWrapperClassName,
  hideColon = false,
  labelStartComponent,
  labelEndComponent,
  getValueOnChange,
  runAfterOnChange,
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
  const LabelAddon = (FieldControl as FieldComponentWithAddon).LabelAddon;

  const handleChange = (input: unknown) => {
    if (!getValueOnChange) return field.onChange(input);

    if (runAfterOnChange) {
      field.onChange(input);
      getValueOnChange({ name, value: getEventValue(input) });
    } else {
      getValueOnChange({ name, value: field.value });
      field.onChange(input);
    }
  };

  const labelNode = label ? (
    <Label
      htmlFor={id}
      className={cn(
        "font-normal text-gray-600 2xl:text-2xl!",
        horizontal && "justify-end text-right pt-3",
        labelClassName,
      )}
    >
      {labelStartComponent}
      {label}
      {!hideColon && ":"}
      {required && <span className="text-red-500!">*</span>}
      {labelEndComponent}
    </Label>
  ) : (
    horizontal && <span />
  );

  return (
    <div
      className={cn(
        horizontal
          ? "grid grid-cols-[14rem_1fr] 2xl:grid-cols-[18rem_1fr] items-start gap-x-8"
          : "flex flex-col gap-2",
        containerClassName,
      )}
    >
      {LabelAddon ? (
        // Kept outside <Label> so clicking the addon can't activate the label
        <div className={cn("flex flex-col gap-3", horizontal && "items-end")}>
          {labelNode}
          <LabelAddon
            {...componentProps}
            value={field.value}
            onChange={handleChange}
          />
        </div>
      ) : (
        labelNode
      )}
      <div className={cn("flex flex-col gap-2 min-w-0", controlClassName)}>
        <div className="flex items-center gap-2">
          {leftElement}
          <div className="min-w-0 flex-1">
            <InputWrapper
              startIcon={startIcon}
              endIcon={endIcon}
              startIconClassName={startIconClassName}
              endIconClassName={endIconClassName}
              className={inputWrapperClassName}
              invalid={!!fieldState.error}
            >
              <FieldControl
                {...componentProps}
                id={id}
                aria-invalid={!!fieldState.error}
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                {...{
                  [valuePropName]:
                    field.value ?? (valuePropName === "value" ? "" : undefined),
                  [changePropName]: handleChange,
                }}
              />
            </InputWrapper>
          </div>

          {rightElement}
        </div>

        {fieldState.error ? (
          <ValidationError
            message={fieldState.error.message}
            className={errorClassName}
          />
        ) : (
          hint && <p className="text-base text-gray-500">{hint}</p>
        )}
      </div>
    </div>
  );
}

export default InputField;
