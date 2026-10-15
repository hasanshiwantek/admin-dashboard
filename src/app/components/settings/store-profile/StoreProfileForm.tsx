
"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import PageLayout from "@/components/ui/PageLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const storeProfileSchema = yup.object({
  storeDisplayName: yup
    .string()
    .required("Store display name is required"),
  address: yup.string().required("Address is required"),
  addressType: yup.string().required("Address type is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: yup.string().default(""),
});

type StoreProfileFormValues = yup.InferType<
  typeof storeProfileSchema
>;

const addressTypeOptions = [
  { value: "home_office", label: "Home office" },
];

const StoreProfileForm = () => {
  const router = useRouter();

  const form = useForm<StoreProfileFormValues>({
    resolver: yupResolver(storeProfileSchema),
    defaultValues: {
      storeDisplayName: "New Ecom Store",
      address: "",
      addressType: "home_office",
      email: "info@new-ecom-store.mybigcommerce.com",
      phone: "",
    },
  });

  const onSubmit = async (values: StoreProfileFormValues) => {
    // Temporary: connect the existing backend API here.
    console.log("Store profile values:", values);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-background-light">
        <div className="mx-auto w-full max-w-[900px] px-5 py-8">
          {/* Page heading */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-4 flex items-center gap-3 text-sm text-slate-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              <span>Settings</span>
            </button>

            <h1 className="text-[36px] font-light leading-tight text-primary-light">
              Store profile
            </h1>
          </div>

          {/* Contact information */}
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
            <h2 className="text-[24px]! font-normal text-primary-light">
              Contact information
            </h2>

            {/* Store display name */}
          
<div className="flex  flex-col gap-2">
  <label
    htmlFor="storeDisplayName"
    className="font-medium text-[16px]! text-text-heading-light"
  >
    Store display name
  </label>

  <p className="leading-6 text-[14px]! text-text-heading-light">
    Store display name is used as your storefront&apos;s default
    text logo, appearing at the top of all storefront pages.
    You can also{" "}
    <Link
      href="/manage/storefront/logo"
      className="text-blue-600 text-[14px]! hover:underline"
    >
      upload an image logo instead.
    </Link>
  </p>

  <InputField
    name="storeDisplayName"
    control={form.control}
    layout="vertical"
    containerClassName="flex flex-col gap-0"
    controlClassName="w-full text-[8px]!"
    className="h-12 font-normal!"
  />
</div>


            {/* Address */}
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

            {/* Address type */}
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

            {/* Email */}
            
<div className="flex max-w-[520px] flex-col gap-2">
  <label
    htmlFor="email"
    className="text-text-heading-light text-[16px] font-medium"
  >
    Email <span className="text-red-500!">*</span>
  </label>

  <p className="text-base leading-6 text-[#52658A]">
    All emails to customers will be sent from this address.
  </p>

  <InputField
    name="email"
    type="email"
    control={form.control}
    layout="vertical"
    containerClassName="flex flex-col gap-0"
    controlClassName="w-full"
    className="font-normal!"
  />
</div>


            {/* Phone */}
           
<div className="flex max-w-[520px] flex-col gap-2">
  <label
    htmlFor="phone"
    className="text-text-heading-light text-[16px] font-medium"
  >
    Phone
  </label>

  <p className="text-base leading-6 text-[#52658A]">
    The number displayed on your storefront. Adding a number improves conversion rates.
  </p>

  <InputField
    name="phone"
    type="tel"
    control={form.control}
    layout="vertical"
    containerClassName="flex flex-col gap-0"
    controlClassName="w-full"
  />
</div>

          </Form>
        </div>
      </div>
    </PageLayout>
  );
};

export default StoreProfileForm;
