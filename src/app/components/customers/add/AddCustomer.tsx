"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import { Textarea } from "@/components/ui/textarea";
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
import * as yup from "yup";

type CustomerFormValues = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  customerGroup: string;
  phone: string;
  storeCredit: string;
  acsEmail: string;
  forceReset: string;
  taxCode: string;
  password: string;
  confirmPassword: string;
  analytics: string;
  functional: string;
  targeting: string;
  address: string;
  state: string;
  country: string;
};

const customerDefaultValues: CustomerFormValues = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  customerGroup: "",
  phone: "",
  storeCredit: "0.00",
  acsEmail: "true",
  forceReset: "false",
  taxCode: "",
  password: "",
  confirmPassword: "",
  analytics: "",
  functional: "",
  targeting: "",
  address: "",
  state: "",
  country: "",
};

const createCustomerSchema = (isEdit: boolean) =>
  yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    companyName: yup.string().defined(),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    customerGroup: yup.string().defined(),
    phone: yup.string().defined(),
    storeCredit: yup.string().defined(),
    acsEmail: yup.string().defined(),
    forceReset: yup.string().defined(),
    taxCode: yup.string().defined(),
    password: isEdit
      ? yup.string().defined()
      : yup.string().required("Password is required"),
    confirmPassword: isEdit
      ? yup.string().defined()
      : yup.string().required("Confirm password is required"),
    analytics: yup.string().defined(),
    functional: yup.string().defined(),
    targeting: yup.string().defined(),
    address: yup.string().defined(),
    state: yup.string().defined(),
    country: yup.string().defined(),
  });

const yesNoOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

const AddCustomer = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isEdit = !!id;
  const { showAlert, Alert } = useAlert();
  const [emailError, setEmailError] = useState("");
  const [emailChecking, setEmailChecking] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const schema = useMemo(() => createCustomerSchema(isEdit), [isEdit]);
  const form = useForm<CustomerFormValues>({
    resolver: yupResolver(schema),
    defaultValues: customerDefaultValues,
  });
  const { control, register, reset, setValue } = form;
  const country = useWatch({ control, name: "country" });
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

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

  useEffect(() => {
    if (!isEdit) return;

    dispatch(fetchCustomerById({ id })).then((result: any) => {
      const customer = result.payload.data;
      if (!customer) return;

      reset({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        companyName: customer.companyName || "",
        email: customer.email || "",
        customerGroup: customer.customerGroup || "",
        phone: customer.phone || "",
        storeCredit: customer.storeCredit || "0.00",
        acsEmail: customer.receiveReviewEmails ? "true" : "false",
        forceReset: customer.forcePasswordReset ? "true" : "false",
        taxCode: customer.taxExemptCode || "",
        password: "",
        confirmPassword: "",
        analytics: customer.analytics || "",
        functional: customer.fuctional || "",
        targeting: customer.targeting || "",
        address: customer.address || "",
        state: customer.state || "",
        country: customer.country || "",
      });
    });
  }, [dispatch, id, isEdit, reset]);

  useEffect(() => {
    setPasswordMismatch(
      confirmPassword.length > 0 && confirmPassword !== password,
    );
  }, [confirmPassword, password]);

  const checkEmail = async (email: string) => {
    if (isEdit || !email) return true;
    if (email === checkedEmail) return !emailError;

    setEmailChecking(true);
    try {
      const result: any = await dispatch(checkCustomerEmail({ email }));
      const isAvailable =
        result.meta.requestStatus === "fulfilled" && result.payload?.status;
      const message = isAvailable
        ? ""
        : result.payload?.message || "This email cannot be used.";
      setEmailError(message);
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

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      companyName: values.companyName,
      email: values.email,
      customerGroup: values.customerGroup,
      phone: values.phone,
      country: values.country,
      state: values.state,
      address: values.address,
      storeCredit: values.storeCredit,
      receiveReviewEmails: values.acsEmail === "true",
      forcePasswordReset: values.forceReset === "true",
      taxExemptCode: values.taxCode,
      password: values.password,
      password_confirmation: values.confirmPassword,
      analytics: values.analytics,
      functional: values.functional,
      targeting: values.targeting,
    };

    try {
      const result = isEdit
        ? await dispatch(updateCustomer({ id, data: payload }))
        : await dispatch(addCustomer({ data: payload }));

      if (result.meta.requestStatus === "fulfilled") {
        if (saveAnother && !isEdit) {
          reset(customerDefaultValues);
          setCheckedEmail("");
          setEmailError("");
          setPasswordMismatch(false);
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

  const emailField = register("email");

  return (
    <PageLayout>
      <PageTitle
        title={`${isEdit ? "Update" : "Add"} customer`}
        hideActionButton
      />
      <Form
        form={form}
        onSubmit={(values) => submitCustomer(values, false)}
        footer={
          <div className="fixed bottom-0 right-0 z-10 flex w-full items-center justify-end gap-4 border-t bg-white p-6">
            <button
              className="p-4 text-xl! text-blue-500!"
              type="button"
              onClick={() => router.push("/manage/customers")}
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-outline-primary"
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
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={
                form.formState.isSubmitting || emailChecking || !!emailError
              }
            >
              {form.formState.isSubmitting
                ? "Saving..."
                : isEdit
                  ? "Update Customer"
                  : "Add Customer"}
            </button>
          </div>
        }
      >
        <section className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold text-gray-700">
            Customer details
          </h2>

          <InputField
            name="firstName"
            label="First name"
            required
            control={control}
          />
          <InputField
            name="lastName"
            label="Last name"
            required
            control={control}
          />
          <InputField
            name="companyName"
            label={
              <>
                Company name <span className="text-sm text-muted-foreground">(optional)</span>
              </>
            }
            control={control}
          />

          <div className="grid grid-cols-[14rem_1fr] items-start gap-x-8">
            <Label htmlFor="customer-email" className="pt-3 text-right">
              Email <span className="text-red-500!">*</span>
            </Label>
            <div className="flex min-w-0 flex-col gap-2">
              <Input
                {...emailField}
                id="customer-email"
                type="email"
                required
                aria-invalid={!!emailError || !!form.formState.errors.email}
                onChange={(event) => {
                  emailField.onChange(event);
                  setEmailError("");
                  setCheckedEmail("");
                }}
                onBlur={(event) => {
                  emailField.onBlur(event);
                  if (event.target.checkValidity()) {
                    void checkEmail(event.target.value);
                  }
                }}
              />
              {emailChecking && (
                <p className="text-sm text-muted-foreground">
                  Checking email...
                </p>
              )}
              {emailError && <p className="text-sm text-red-500!">{emailError}</p>}
              {form.formState.errors.email?.message && (
                <p className="text-sm text-red-500!">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <InputField
            name="address"
            label="Address"
            control={control}
            Component={Textarea}
            rows={4}
            controlClassName="max-w-2xl"
          />
          <InputField
            name="country"
            label="Country"
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
            name="state"
            label="State"
            Component={SelectField}
            control={control}
            options={stateOptions}
            placeholder="Select state"
            disabled={!country}
          />
          <InputField
            name="phone"
            label={
              <>
                Phone <span className="text-sm text-muted-foreground">(optional)</span>
              </>
            }
            control={control}
          />
          <InputField
            name="acsEmail"
            label="Receive ACS/review emails"
            labelEndComponent={
              <Info className="ml-1 inline h-4 w-4 text-muted-foreground" />
            }
            Component={SelectField}
            control={control}
            options={yesNoOptions}
          />
          <InputField
            name="forceReset"
            label="Force password reset on next login"
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
              <>
                Tax exempt code{" "}
                <span className="text-sm text-muted-foreground">(optional)</span>
              </>
            }
            control={control}
          />
        </section>

        <section className="flex flex-col gap-8 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Password</h2>
          <TooltipProvider>
            <InputField
              name="password"
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
              required={!isEdit}
              disabled={isEdit}
            />
            <>
              <InputField
                name="confirmPassword"
                label="Confirm password"
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
                required={!isEdit}
                disabled={isEdit}
              />
              {passwordMismatch && (
                <p className="text-sm text-red-500!">Passwords do not match.</p>
              )}
            </>
          </TooltipProvider>
        </section>
      </Form>
      <Alert />
    </PageLayout>
  );
};

export default AddCustomer;
