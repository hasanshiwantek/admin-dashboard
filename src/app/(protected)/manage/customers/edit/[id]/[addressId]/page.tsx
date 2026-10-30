"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import PageLayout from "@/components/ui/PageLayout";
import { Button } from "@/components/ui/Button";
import { AddressField, addressTypeOptions } from "./constant";
import { useAddressFormContainer } from "./container";
import { RadioGroupField } from "@/components/form/fields/RadioGroupField";

export default function AddressForm() {
  const {
    form,
    control,
    country,
    countryOptions,
    stateOptions,
    Alert,
    handleCountryChange,
    handleStateChange,
    submitAddress,
    router,
    isEdit,
    cancelUrl,
  } = useAddressFormContainer();

  return (
    <PageLayout
      title={`${isEdit ? "Update" : "Add"} address`}
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
      }}
      className="mx-auto max-w-[900px]"
    >
      <Form
        form={form}
        onSubmit={(values) => submitAddress(values)}
        footer={{
          submitText: isEdit ? "Update Address" : "Add Address",
          loading: form.formState.isSubmitting,
          onCancel: () => router.push(cancelUrl),
          extraActions: !isEdit ? (
            <Button
              type="button"
              variant="outline"
              size="xl"
              disabled={form.formState.isSubmitting}
              onClick={() =>
                void form.handleSubmit(
                  (values) => submitAddress(values, true),
                  () => undefined,
                )()
              }
            >
              {form.formState.isSubmitting
                ? "Saving..."
                : "Save and add another"}
            </Button>
          ) : null,
        }}
      >
        <section className="flex w-full flex-col gap-8 pb-10">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            <InputField
              name={AddressField.firstName}
              label="First name"
              layout="vertical"
              required
              control={control}
              containerClassName="w-full"
              controlClassName="w-full"
              className="w-full max-w-none"
            />

            <InputField
              name={AddressField.lastName}
              label="Last name"
              layout="vertical"
              required
              control={control}
              containerClassName="w-full"
              controlClassName="w-full"
              className="w-full max-w-none"
            />

            <InputField
              name={AddressField.companyName}
              label="Company name"
              layout="vertical"
              control={control}
              containerClassName="w-full"
              controlClassName="w-full"
              className="w-full max-w-none"
            />

            <InputField
              name={AddressField.phoneNumber}
              label="Phone number"
              layout="vertical"
              control={control}
              containerClassName="w-full"
              controlClassName="w-full"
              className="w-full max-w-none"
            />
          </div>

          <InputField
            name={AddressField.addressLine1}
            label="Address line 1"
            layout="vertical"
            required
            control={control}
            containerClassName="w-full"
            controlClassName="w-full"
            className="w-full max-w-none"
          />

          <InputField
            name={AddressField.addressLine2}
            label="Address line 2"
            layout="vertical"
            control={control}
            containerClassName="w-full"
            controlClassName="w-full"
            className="w-full max-w-none"
          />

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            <InputField
              name={AddressField.city}
              label="City"
              layout="vertical"
              required
              control={control}
              containerClassName="w-full"
              controlClassName="w-full"
              className="w-full max-w-none"
            />

            <InputField
              name={AddressField.country}
              label="Country"
              layout="vertical"
              Component={SelectField}
              control={control}
              options={countryOptions}
              placeholder="Select country"
              required
              getValueOnChange={handleCountryChange}
              runAfterOnChange
              containerClassName="w-full"
              controlClassName="w-full"
              className="w-full max-w-none"
            />

            <InputField
              name={AddressField.state}
              label="State"
              layout="vertical"
              Component={SelectField}
              control={control}
              options={stateOptions}
              placeholder="Select state"
              disabled={!country}
              required
              getValueOnChange={handleStateChange}
              runAfterOnChange
              containerClassName="w-full"
              controlClassName="w-full"
              className="w-full max-w-none"
            />

            <InputField
              name={AddressField.zip}
              label="Postal code"
              layout="vertical"
              control={control}
              containerClassName="w-full"
              controlClassName="w-full"
              className="w-full max-w-none"
            />
          </div>

          <InputField
            name={AddressField.type}
            label="Address type"
            layout="vertical"
            Component={RadioGroupField}
            control={control}
            options={addressTypeOptions}
            containerClassName="w-full"
            controlClassName="w-full"
          />
        </section>
      </Form>
      <Alert />
    </PageLayout>
  );
}
