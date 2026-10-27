"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { CustomerField, yesNoOptions } from "./constant";
import { useCustomerFormContainer } from "./container";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";

const LIST_PATH = "/manage/customers/";

const page = () => {
  const {
    form,
    control,
    isEdit,
    emailError,
    emailChecking,
    country,
    countryOptions,
    stateOptions,
    Alert,
    clearEmailState,
    checkEmail,
    submitCustomer,
    handleCountryChange,
    router,
  } = useCustomerFormContainer();

  return (
    <PageLayout>
      <PageTitle
        title={`${isEdit ? "Update" : "Add"} customer`}
        hideActionButton
      />

      <Form
        form={form}
        onSubmit={(values) => submitCustomer(values, false)}
        footer={{
          submitText: isEdit ? "Update Customer" : "Add Customer",
          loading: form.formState.isSubmitting,
          onCancel: () => router.push(LIST_PATH),
          extraActions: !isEdit ? (
            <Button
              variant="default"
              className="flex items-center gap-2 px-6! btn-outline-primary 2xl:text-2xl h-13 py-0 my-0"
              disabled={
                form.formState.isSubmitting || emailChecking || !!emailError
              }
              onClick={() =>
                void form.handleSubmit(
                  (values) => submitCustomer(values, true),
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
        <section className="flex flex-col gap-8 pb-10">
          <PageTitle title="Customer details" hideActionButton />

          <InputField
            name={CustomerField.firstName}
            label="First name"
            required
            layout="vertical"
            control={control}
          />
          <InputField
            name={CustomerField.lastName}
            label="Last name"
            required
            layout="vertical"
            control={control}
          />
          <InputField
            name={CustomerField.companyName}
            label={
              <div className="flex justify-between gap-1">
                <div>Company name</div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    (optional)
                  </span>
                </div>
              </div>
            }
            layout="vertical"
            control={control}
          />

          <InputField
            name={CustomerField.email}
            label="Email"
            type="email"
            layout="vertical"
            required
            control={control}
            getValueOnChange={clearEmailState}
            runAfterOnChange
            onBlurCapture={(event) => {
              if (event.target.checkValidity()) {
                void checkEmail(event.target.value);
              }
            }}
          />

          <InputField
            name={CustomerField.address}
            label="Address"
            layout="vertical"
            controlClassName="max-w-none"
            control={control}
          />

          <InputField
            name={CustomerField.country}
            label="Country"
            layout="vertical"
            Component={SelectField}
            control={control}
            options={countryOptions}
            placeholder="Select country"
            getValueOnChange={handleCountryChange}
            runAfterOnChange
          />

          <InputField
            name={CustomerField.state}
            label="State"
            layout="vertical"
            Component={SelectField}
            control={control}
            options={stateOptions}
            placeholder="Select state"
            disabled={!country}
          />

          <InputField
            name={CustomerField.phone}
            label={
              <div className="flex justify-between gap-1">
                <div>Phone</div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    (optional)
                  </span>
                </div>
              </div>
            }
            layout="vertical"
            control={control}
          />

          <InputField
            name={CustomerField.acsEmail}
            label="Receive ACS/review emails"
            layout="vertical"
            Component={SelectField}
            control={control}
            options={yesNoOptions}
          />

          <InputField
            name={CustomerField.forceReset}
            label="Force password reset on next login"
            layout="vertical"
            Component={SelectField}
            control={control}
            options={yesNoOptions}
          />

          <InputField
            name={CustomerField.taxCode}
            label={
              <div className="flex justify-between gap-1">
                <div>Tax exempt code</div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    (optional)
                  </span>
                </div>
              </div>
            }
            control={control}
            layout="vertical"
          />
        </section>

        {!isEdit && (
          <section className="flex flex-col gap-8 border-t border-gray-200 pt-8">
            <PageTitle title="Password" hideActionButton />

            <InputField
              layout="vertical"
              name={CustomerField.password}
              label="Password"
              labelEndComponent={
                <HelpTooltip
                  content="Specify the password this customer should use to log in to
                      your store. Once logged in, the customer can view past
                      orders, submit return requests, etc."
                />
              }
              hint="Passwords must be at least 7 characters long and contain both alphabetic and numeric characters."
              control={control}
              type="password"
              required
            />

            <InputField
              name={CustomerField.confirmPassword}
              label="Confirm password"
              layout="vertical"
              labelEndComponent={
                <HelpTooltip content="Confirm the password entered above by entering it again." />
              }
              control={control}
              type="password"
              required
            />
          </section>
        )}
      </Form>

      <Alert />
    </PageLayout>
  );
};

export default page;
