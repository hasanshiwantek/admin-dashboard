"use client";

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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { customerDefaultValues, CustomerField } from "./constant";
import { createCustomerSchema } from "@/validations/formValidations";
import {
  transformGetCustomerPayload,
  transformPostCustomerPayload,
} from "./utils";
import type { CustomerFormValues } from "./types";

const LIST_PATH = "/manage/customers/";

export const useCustomerFormContainer = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isEdit = !!id && id !== "new";
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
  const country = useWatch({ control, name: CustomerField.country });

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

    const payload = transformPostCustomerPayload(values, isEdit);

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
          clearErrors();
        } else {
          setTimeout(() => router.push(LIST_PATH), 700);
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

  const clearEmailState = () => {
    setEmailError("");
    clearErrors(CustomerField.email);
    setCheckedEmail("");
  };

  const handleCountryChange = ({ value }: { value: unknown }) => {
    if (typeof value === "string") {
      setValue(CustomerField.state, "");
    }
  };

  return {
    form,
    control,
    isEdit,
    emailError,
    emailChecking,
    country,
    countryOptions,
    stateOptions,
    Alert,
    setValue,
    clearEmailState,
    checkEmail,
    submitCustomer,
    handleCountryChange,
    router,
  };
};