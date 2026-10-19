"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import { StoreProfileSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { addressTypeOptions, storeProfileDefault } from "./constant";
import { StoreProfileFormValues } from "./type";

const StoreProfilePage = () => {
  const form = useForm<StoreProfileFormValues>({
    resolver: yupResolver(StoreProfileSchema),
    defaultValues: storeProfileDefault,
  });

  const onSubmit = async (values: StoreProfileFormValues) => {
    // Temporary: connect the existing backend API here.
    console.log("Store profile values:", values);
  };

  return (
    <PageLayout
      backButton={{ label: "Settings", href: "/manage/settings" }}
      title="Store profile"
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
      }}
      className="mx-auto max-w-[900px]"
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        className="pb-24"
        bodyClassName="gap-6 rounded-md border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
        footer={{
          submitText: "Save",
          loading: form.formState.isSubmitting,
        }}
      >
        <PageTitle
          title="Contact information"
          hideActionButton
          titleClassName="text-[24px]! font-normal text-primary-light"
          containerClassName="mb-0"
          textContainerClassName="mb-0"
        />

        <div className="flex flex-col gap-2">
          <InputField
            name="storeDisplayName"
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-0"
            controlClassName="w-full text-[8px]!"
            className="h-12 font-normal!"
            label={
              <div className="flex flex-col gap-2">
                <span className="font-medium text-[16px]! text-text-heading-light">
                  Store display name
                </span>

                <p className="leading-6 text-[14px]! text-text-heading-light">
                  Store display name is used as your storefront&apos;s default
                  text logo, appearing at the top of all storefront pages. You
                  can also{" "}
                  <Link
                    href="/manage/storefront/logo"
                    className="text-blue-600 text-[14px]! hover:underline"
                  >
                    upload an image logo instead.
                  </Link>
                </p>
              </div>
            }
          />
        </div>

        <InputField
          name="address"
          label="Address"
          required
          isTextArea
          control={form.control}
          layout="vertical"
          containerClassName="max-w-[520px] gap-2"
          labelClassName="text-text-heading-light text-[16px]! font-medium"
          controlClassName="w-full"
          className="min-h-[100px] resize-y"
        />

        <InputField
          name="addressType"
          label="Address type"
          required
          Component={SelectField}
          control={form.control}
          layout="vertical"
          containerClassName="max-w-[520px] gap-2"
          labelClassName="text-text-heading-light text-[16px]! font-medium"
          controlClassName="w-full"
          options={addressTypeOptions}
          placeholder="Choose address type"
          className="w-full"
        />

        <div className="flex max-w-[520px] flex-col gap-2">
          <InputField
            name="email"
            type="email"
            control={form.control}
            layout="vertical"
            required
            containerClassName="flex flex-col gap-0"
            controlClassName="w-full"
            className="font-normal!"
            label={
              <div className="flex flex-col gap-2">
                <span className="text-text-heading-light text-[16px] font-medium">
                  Email
                </span>

                <p className="text-base leading-6 text-[#52658A]">
                  All emails to customers will be sent from this address.
                </p>
              </div>
            }
          />
        </div>

        <div className="flex max-w-[520px] flex-col gap-2">
          <InputField
            name="phone"
            type="tel"
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-0"
            controlClassName="w-full"
            label={
              <div className="flex flex-col gap-2">
                <span className="text-text-heading-light text-[16px] font-medium">
                  Phone
                </span>

                <p className="text-base leading-6 text-[#52658A]">
                  The number displayed on your storefront. Adding a number
                  improves conversion rates.
                </p>
              </div>
            }
          />
        </div>
      </Form>
    </PageLayout>
  );
};

export default StoreProfilePage;
