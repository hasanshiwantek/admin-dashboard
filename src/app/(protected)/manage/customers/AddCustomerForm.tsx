"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useAlert } from "@/hooks/useAlert";
import {
  addCustomer,
  checkCustomerEmail,
  fetchCustomerById,
  updateCustomer,
} from "@/redux/slices/customerSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Country, State } from "country-state-city";
import { Info } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { customerDefaultValues, CustomerField, yesNoOptions } from "./constant";
import type { CustomerFormValues } from "./types";
import { createCustomerSchema } from "@/validations/formValidations";
import {
  transformGetCustomerPayload,
  transformPostCustomerPayload,
} from "./utils";
import { Button } from "@/components/ui/button";

const LIST_PATH = "/manage/customers/";

const AddCustomerForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isEdit = !!id;
  const { showAlert, Alert } = useAlert();

  const [emailError, setEmailError] = useState("");
  const [emailChecking, setEmailChecking] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState("");

  const schema = useMemo(() => createCustomerSchema(isEdit), [isEdit]);

  const form = useForm<CustomerFormValues>({
    resolver: yupResolver(schema),
    defaultValues: customerDefaultValues,
  });

  const { control, reset, setValue, setError, clearErrors } = form;
  const country = useWatch({ control, name: "country" });

  const countryOptions = useMemo(
    () =>
      Country.getAllCountries().map((item) => ({
        value: item.isoCode,
        label: item.name,
      })),
    [],
  );

  const stateOptions = useMemo(
    () =>
      country
        ? State.getStatesOfCountry(country).map((item) => ({
            value: item.isoCode,
            label: item.name,
          }))
        : [],
    [country],
  );

  // Load customer on edit
  useEffect(() => {
    if (!isEdit) return;

    dispatch(fetchCustomerById({ id })).then((result: any) => {
      const customer = result.payload?.data;
      if (!customer) return;

      reset(transformGetCustomerPayload(customer));
    });
  }, [dispatch, id, isEdit, reset]);

  const checkEmail = async (email: string) => {
    if (isEdit || !email) return true;
    if (email === checkedEmail) return !emailError;

    setEmailChecking(true);
    try {
      const result: any = await dispatch(checkCustomerEmail({ email }));
      const isAvailable =
        result.meta.requestStatus === "fulfilled" && result.payload?.status;

      if (isAvailable) {
        clearErrors(CustomerField.email);
        setEmailError("");
      } else {
        const message =
          result.payload?.message || "The email has already been taken.";
        setError(CustomerField.email, { type: "manual", message });
        setEmailError(message);
      }

      setCheckedEmail(email);
      return !!isAvailable;
    } finally {
      setEmailChecking(false);
    }
  };
  const submitCustomer = async (
    values: CustomerFormValues,
    saveAnother: boolean,
  ) => {
    const isEmailAvailable = await checkEmail(values.email);
    if (!isEmailAvailable) return;

    // Submit
    const payload = transformPostCustomerPayload(values, isEdit);

    // Only send password on create (or if you later allow edit)
    if (!isEdit && values.password) {
      payload.password = values.password;
      payload.password_confirmation = values.confirmPassword;
    }

    try {
      const result = isEdit
        ? await dispatch(updateCustomer({ id, data: payload }))
        : await dispatch(addCustomer({ data: payload }));

      if (result.meta.requestStatus === "fulfilled") {
        if (saveAnother && !isEdit) {
          reset(customerDefaultValues);
          setCheckedEmail("");
          setEmailError("");
        } else {
          setTimeout(() => {
            router.push("/manage/customers/");
          }, 700);
        }
      } else {
        showAlert({
          title: "Customer Save Failed",
          message: "Customer save failed.",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      showAlert({
        title: "Unexpected Error",
        message: "Unexpected error occurred.",
      });
    }
  };

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
          submitText: "Add Customer",
          loading: form.formState.isSubmitting,
          onCancel: () => router.push(LIST_PATH),
          extraActions: (
            <Button
              variant="default"
              className={`flex items-center gap-2 !px-6 btn-outline-primary 2xl:!text-2xl !h-13 !py-0 !my-0`}
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
          ),
        }}
      >
        <section className="flex flex-col gap-8 pb-10">
          <PageTitle title={`Customer details`} hideActionButton />

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
                <div>Company name </div>
                <div>
                  {" "}
                  <span className="text-sm text-muted-foreground">
                    (optional)
                  </span>
                </div>
              </div>
            }
            layout="vertical"
            control={control}
          />

          {/* Email */}
          <div>
            <InputField
              name={CustomerField.email}
              label="Email"
              type="email"
              layout="vertical"
              required
              control={control}
              getValueOnChange={() => {
                setEmailError("");
                clearErrors(CustomerField.email);
                setCheckedEmail("");
              }}
              runAfterOnChange
              onBlurCapture={(event) => {
                if (event.target.checkValidity()) {
                  void checkEmail(event.target.value);
                }
              }}
            />
          </div>
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
            getValueOnChange={({ value }) => {
              if (typeof value === "string") {
                setValue("state", "");
              }
            }}
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
                <div>Phone </div>
                <div>
                  {" "}
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
            labelEndComponent={
              <Info className="ml-1 inline h-4 w-4 text-muted-foreground" />
            }
            Component={SelectField}
            control={control}
            options={yesNoOptions}
          />

          <InputField
            name={CustomerField.forceReset}
            label="Force password reset on next login"
            layout="vertical"
            labelEndComponent={
              <Info className="ml-1 inline h-4 w-4 text-muted-foreground" />
            }
            Component={SelectField}
            control={control}
            options={yesNoOptions}
          />

          <InputField
            name="taxCode"
            label={
              <div className="flex justify-between gap-1">
                <div>Tax exempt code </div>
                <div>
                  {" "}
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

        {/* Password section – only shown / required on create */}
        {!isEdit && (
          <section className="flex flex-col gap-8 border-t border-gray-200 pt-8">
            <PageTitle title={`Password`} hideActionButton />

            <TooltipProvider>
              <InputField
                layout="vertical"
                name={CustomerField.password}
                label="Password"
                labelEndComponent={
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-4 w-4 cursor-pointer text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Specify the password this customer should use to log in to
                      your store. Once logged in, the customer can view past
                      orders, submit return requests, etc.
                    </TooltipContent>
                  </Tooltip>
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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-4 w-4 cursor-pointer text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Confirm the password entered above by entering it again.
                    </TooltipContent>
                  </Tooltip>
                }
                control={control}
                type="password"
                required
              />
            </TooltipProvider>
          </section>
        )}
      </Form>
      <Alert />
    </PageLayout>
  );
};

export default AddCustomerForm;
