"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import CheckboxField from "@/components/form/fields/CheckboxField";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { addCategory } from "@/redux/slices/categorySlice";
import { refetchCategories } from "@/lib/categoryUtils";
import CategoryDropdown from "./CategoryDropdown";
import { CategorySchema } from "@/validations/formValidations";
import { addCategoryDefault, CategoryField } from "./constant";
import { CategoryFormValues } from "./type";
import { getChannelPayload } from "./utils";

const defaultValues: CategoryFormValues = {
  ...addCategoryDefault,
};

// Adapter for CategoryDropdown shape
function ParentCategoryField({
  value,
  onChange,
  categoryData,
}: {
  value?: number | null;
  onChange: (val: number | null) => void;
  categoryData: any;
}) {
  return (
    <CategoryDropdown
      categoryData={categoryData}
      value={{
        id: value != null ? Number(value) : null,
        path: "",
      }}
      onChange={(val) => onChange(val?.id ?? null)}
      className="max-w-full"
    />
  );
}

export default function AddCategoryModal({
  open,
  onOpenChange,
  categoryData,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  categoryData: any;
}) {
  const currentStore = useAppSelector((state) => state.config.currentStore);
  const dispatch = useAppDispatch();

  const form = useForm<CategoryFormValues>({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const { control, reset, setValue } = form;

  useEffect(() => {
    if (currentStore?.name) {
      setValue(CategoryField.CHANNEL, currentStore.name);
    }
  }, [currentStore?.name, setValue]);

  useEffect(() => {
    if (!open) reset(defaultValues);
  }, [open, reset]);

  const onSubmit = async (values: CategoryFormValues) => {
    const payload = getChannelPayload(values);
    try {
      await dispatch(
        addCategory({
          data: payload,
        }),
      ).unwrap();

      setTimeout(() => refetchCategories(dispatch), 600);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const channelOptions = currentStore?.name
    ? [{ value: currentStore.name, label: currentStore.name }]
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[500px] p-10">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>

        <Form
          form={form}
          onSubmit={onSubmit}
          footer={{
            submitText: "Save and edit",
            onCancel: () => onOpenChange(false),
            loading: form.formState.isSubmitting,
          }}
        >
          {/* Display Name */}
          <InputField
            name={CategoryField.NAME}
            label="Display name"
            required
            control={control}
            placeholder="New category"
            layout="vertical"
            containerClassName="space-y-2"
            className="!max-w-full"
          />

          {/* Channel */}
          <InputField
            name={CategoryField.CHANNEL}
            label="Channel"
            required
            Component={SelectField}
            control={control}
            options={channelOptions}
            placeholder="Select channel"
            layout="vertical"
            containerClassName="space-y-2"
            className="!max-w-full"
          />

          {/* Parent Category */}
          <InputField
            name={CategoryField.PARENT_ID}
            label="Parent category"
            Component={ParentCategoryField}
            control={control}
            categoryData={categoryData}
            layout="vertical"
            containerClassName="space-y-2"
            hint="Leave empty to add to the root category"
          />

          {/* Enable Visibility */}
          <InputField
            name={CategoryField.IS_VISIBLE}
            text="Enable visibility"
            Component={CheckboxField}
            control={control}
            hint="Makes new categories immediately available on the storefront."
            layout="vertical"
            containerClassName="flex-start! space-x-2 pt-2"
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
