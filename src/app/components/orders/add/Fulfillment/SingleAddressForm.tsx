"use client";
import { useEffect, useState, useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ShippingMethod from "./ShippingMethod";
import { Country, State } from "country-state-city";

export default function SingleAddressForm() {
  const { register, control, watch, setValue, getValues } = useFormContext();
  const [originalShippingValues, setOriginalShippingValues] = useState<any>(null);
  const [isAddressOverridden, setIsAddressOverridden] = useState(false);
  const {
    billingFirstName,
    billingLastName,
    billingCompanyName,
    billingPhoneNumber,
    billingAddress1,
    billingAddress2,
    billingCity,
    // billingCountry,
    // billingState,
    billingZip,
  } = getValues();
  const selectedCustomer = watch("selectedCustomer");
  const selectedCountry = watch("shipping.country");
  const billingCountry = watch("billingCountry");
  const billingState = watch("billingState");
  const countryList = Country.getAllCountries().map((c) => ({
    name: c.name,
    code: c.isoCode,
  }));

  const stateList = useMemo(() => {
    if (!selectedCountry) return [];

    return State.getStatesOfCountry(selectedCountry).map((s) => ({
      name: s.name,
      code: s.isoCode,
    }));
  }, [selectedCountry]);


  // ⬇️ Extract customer info (used in preview)
  const {
    firstName,
    lastName,
    companyName,
    phone,
    address,
    city,
    country,
    state,
    zip,
  } = selectedCustomer || {};

  // ⬇️ Auto-fill shipping from billing info ONCE on mount
  useEffect(() => {
    // const {
    //   firstName,
    //   lastName,
    //   companyName,
    //   phoneNumber,
    //   address1,
    //   address2,
    //   city,
    //   country,
    //   state,
    //   zip,
    // } = getValues();

    const values = getValues();

    // console.log("values", values);


    // Only set if shipping is empty
    const shipping = values?.shipping || {};
    const {
      firstName,
      lastName,
      companyName,
      phoneNumber,
      address1,
      address2,
      city,
      country,
      state,
      zip,
    } = shipping

    if (firstName && lastName && address1 && city && country && state && zip) {
      setValue("shipping.firstName", firstName || "");
      setValue("shipping.lastName", lastName || "");
      setValue("shipping.companyName", companyName || "");
      setValue("shipping.phoneNumber", phoneNumber || "");
      setValue("shipping.address1", address1 || "");
      setValue("shipping.address2", address2 || "");
      setValue("shipping.city", city || "");
      setValue("shipping.zip", zip || "");
    } else {
      setValue("shipping.firstName", billingFirstName || "");
      setValue("shipping.lastName", billingLastName || "");
      setValue("shipping.companyName", billingCompanyName || "");
      setValue("shipping.phoneNumber", billingPhoneNumber || "");
      setValue("shipping.address1", billingAddress1 || "");
      setValue("shipping.address2", billingAddress2 || "");
      setValue("shipping.city", billingCity || "");
      setValue("shipping.zip", billingZip || "");
    }
  }, []);

  useEffect(() => {
    if (!billingCountry) return;
    setValue("shipping.country", String(billingCountry), {
      shouldDirty: true,
      shouldTouch: true,
    });
    // setValue("shipping.state", "");
    // setPendingState(billingState || "");
  }, [billingCountry, setValue]);
  useEffect(() => {
    if (!billingCountry || !billingState) return;

    const match = State.getStatesOfCountry(String(billingCountry)).find(
      (s) => s.isoCode === billingState
    );

    if (!match) return;

    setValue("shipping.state", String(match.isoCode), {
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [billingCountry, billingState, setValue]);
  // setValue("shipping.state", billingState || "");
  // ⬇️ Manually override shipping fields from selectedCustomer
  const handleUseThisAddress = () => {
    if (!selectedCustomer) return;

    // Backup current shipping values before overriding
    const currentValues = {
      firstName: watch("shipping.firstName"),
      lastName: watch("shipping.lastName"),
      companyName: watch("shipping.companyName"),
      phoneNumber: watch("shipping.phoneNumber"),
      address1: watch("shipping.address1"),
      address2: watch("shipping.address2"),
      city: watch("shipping.city"),
      country: watch("shipping.country"),
      state: watch("shipping.state"),
      zip: watch("shipping.zip"),
    };

    setOriginalShippingValues(currentValues);
    setIsAddressOverridden(true);

    // Override with selected customer details
    setValue("shipping.firstName", firstName || "");
    setValue("shipping.lastName", lastName || "");
    setValue("shipping.companyName", companyName || "");
    setValue("shipping.phoneNumber", phone || "");
    setValue("shipping.address1", address || "");
    setValue("shipping.address2", "");
    setValue("shipping.city", city || "");
    setValue("shipping.country", country || "");
    setValue("shipping.state", state || "");
    setValue("shipping.zip", zip || "");
  };

  // ⬇️ Revert to original values before override
  const handleRevert = () => {
    if (!originalShippingValues) return;

    Object.entries(originalShippingValues).forEach(([key, value]) => {
      setValue(`shipping.${key}`, value || "");
    });

    setIsAddressOverridden(false);
    setOriginalShippingValues(null);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-md space-y-5">
        <h2 className="!font-bold !text-2xl border-b py-2">Shipping address</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Form inputs */}
          <div className="grid grid-cols-1 gap-4">
            <Input {...register("shipping.firstName")} placeholder="First Name" />
            <Input {...register("shipping.lastName")} placeholder="Last Name" />
            <Input {...register("shipping.companyName")} placeholder="Company Name (Optional)" />
            <Input {...register("shipping.phoneNumber")} placeholder="Phone Number (Optional)" />
            <Input {...register("shipping.address1")} placeholder="Address Line 1" />
            <Input {...register("shipping.address2")} placeholder="Address Line 2 (Optional)" />
            <Input {...register("shipping.city")} placeholder="Suburb/City" />

            <Controller
              name="shipping.country"
              control={control}
              render={({ field }) => (
                <Select
                  key={field.value || "country"}
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setValue("shipping.state", "");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent className="h-96 overflow-y-auto">
                    {countryList.map((country) => (
                      <SelectItem key={country.code} value={String(country.code)}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="shipping.state"
              control={control}
              render={({ field }) => (
                <Select
                  key={field.value || "state"}
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={field.onChange}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="State/Province" />
                  </SelectTrigger>

                  <SelectContent>
                    {stateList.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Input {...register("shipping.zip")} placeholder="Zip/Postcode" />
          </div>
        </div>

        {/* Save to address book */}
        <div className="flex items-center space-x-2 pt-2">
          <Controller
            name="shipping.saveToAddressBook"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label>Save to customer's address book</Label>
        </div>
      </div>

      <ShippingMethod />
    </div>
  );
}
