"use client";

import { cn } from "@/lib/utils";
import { createContext, ReactNode, useContext } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import FormFooter, { FormFooterProps } from "./FormFooter";

type AnyForm = UseFormReturn<any, any, any>;

type FormProps<T extends FieldValues, TTransformed = T> = {
  form: UseFormReturn<T, any, TTransformed>;
  onSubmit: SubmitHandler<TTransformed>;
  onInvalid?: SubmitErrorHandler<T>;
  children: ReactNode;
  footer?: FormFooterProps | ReactNode | false;
  className?: string;
  bodyClassName?: string;
};

const FormContext = createContext<AnyForm | null>(null);

export function useFormContext<
  T extends FieldValues = FieldValues,
  TTransformed = T,
>() {
  const form = useContext(FormContext);
  if (!form) throw new Error("useFormContext must be used inside <Form>");
  return form as UseFormReturn<T, any, TTransformed>;
}

const isFooterProps = (footer: unknown): footer is FormFooterProps =>
  !!footer &&
  typeof footer === "object" &&
  !("$$typeof" in (footer as object)) &&
  !Array.isArray(footer);

export function Form<T extends FieldValues, TTransformed = T>({
  form,
  onSubmit,
  onInvalid,
  children,
  footer = {},
  className,
  bodyClassName,
}: FormProps<T, TTransformed>) {
  return (
    <FormContext.Provider value={form as AnyForm}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className={cn("flex flex-col", className)}
      >
        <div
          className={cn(
            "flex flex-col gap-8 bg-white border border-gray-200 rounded-sm p-10",
            bodyClassName,
          )}
        >
          {children}
        </div>
        {footer !== false &&
          (isFooterProps(footer) ? (
            <FormFooter loading={form.formState.isSubmitting} {...footer} />
          ) : (
            footer
          ))}
      </form>
    </FormContext.Provider>
  );
}

export default Form;
