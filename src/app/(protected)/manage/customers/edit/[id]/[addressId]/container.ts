"use client";

import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useAlert } from "@/hooks/useAlert";
import {
  addCustomerAddress,
  fetchCustomerAddressById,
  updateCustomerAddress,
} from "@/redux/slices/customerSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Country, State } from "country-state-city";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AddressField, addressDefaultValues } from "../[addressId]/constant";
import type { AddressFormValues, AddressMode } from "./types";
import { buildAddressPayload, normalizeAddress } from "./utils";
import { AddressSchema } from "@/validations/formValidations";
export function useAddressFormContainer() {
  const params = useParams<{ id: string; addressId: string }>();
  const customerId = params.id;
  const addressId = params.addressId;
  const isEdit = addressId !== "add";
  const mode: AddressMode = isEdit ? "edit" : "add";
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showAlert, Alert } = useAlert();
  const form = useForm<AddressFormValues>({
    resolver: yupResolver(AddressSchema),
    defaultValues: addressDefaultValues,
  });
  const { control, reset, setValue } = form;
  const country = useWatch({ control, name: AddressField.country });

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
    if (!addressId || !Number.isFinite(Number(addressId))) {
      showAlert({
        title: "Address Not Found",
        message: "A valid address ID is missing.",
      });
      return;
    }

    dispatch(fetchCustomerAddressById({ addressId: Number(addressId) }))
      .unwrap()
      .then((data) => reset(normalizeAddress(data)))
      .catch((error: unknown) => {
        console.error(error);
        showAlert({
          title: "Address Load Failed",
          message: "Failed to load address.",
        });
      });
  }, [addressId]);

  const handleCountryChange = ({ value }: { value: unknown }) => {
    if (typeof value === "string") {
      setValue(AddressField.state, "", { shouldValidate: true });
    }
  };

  const submitAddress = async (
    values: AddressFormValues,
    saveAnother = false,
  ) => {
    if (!customerId || !Number.isFinite(Number(customerId))) {
      showAlert({
        title: "Address Save Failed",
        message: "A valid customer ID is missing.",
      });
      return;
    }
    if (isEdit && (!addressId || !Number.isFinite(Number(addressId)))) {
      showAlert({
        title: "Address Save Failed",
        message: "A valid address ID is missing.",
      });
      return;
    }

    try {
      const payload = buildAddressPayload(values, Number(customerId), mode);
      if (isEdit && addressId) {
        await dispatch(
          updateCustomerAddress({ addressId, data: payload }),
        ).unwrap();
      } else {
        await dispatch(addCustomerAddress({ data: payload })).unwrap();
      }

      if (saveAnother && !isEdit) {
        reset(addressDefaultValues);
      } else {
        router.back();
      }
    } catch (error: unknown) {
      console.error(error);
      showAlert({
        title: isEdit ? "Address Update Failed" : "Address Add Failed",
        message: isEdit
          ? "Failed to update address."
          : "Failed to add address.",
      });
    }
  };

  return {
    form,
    control,
    country,
    countryOptions,
    stateOptions,
    Alert,
    handleCountryChange,
    submitAddress,
    router,
    isEdit,
  };
}
