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
import { useAppSelector } from "@/hooks/useReduxHooks";

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
  const { customerAddresses, addressesLoading } = useAppSelector(
    (state: any) => state.customer
  );
  const selectedCustomer = watch("selectedCustomer");
  const selectedCountry = watch("shipping.country");
  const billingCountry = watch("billingCountry");
  const billingState = watch("billingState");
  const countryList = Country.getAllCountries().map((c) => ({
    name: c.name,
    code: c.isoCode,
  }));
  const [pendingState, setPendingState] = useState("");

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
  const handleUseAddress = (address: any) => {
    setValue("shipping.firstName", address.first_name ?? "");
    setValue("shipping.lastName", address.last_name ?? "");
    setValue("shipping.companyName", address.company_name ?? "");
    setValue("shipping.phoneNumber", address.phone_number ?? "");
    setValue("shipping.address1", address.address_line_1 ?? "");
    setValue("shipping.address2", address.address_line_2 ?? "");
    setValue("shipping.city", address.city ?? "");
    setValue("shipping.zip", address.zip ?? "");
    setValue("shipping.country", address.country ?? "");
    setPendingState(address.state ?? "");
    setValue("shipping.state", "");
  };
  useEffect(() => {
    if (!pendingState || stateList.length === 0) return;
    const stateExists = stateList.some((s) => s.code === pendingState);
    if (stateExists) {
      setValue("shipping.state", pendingState);
      setPendingState("");
    }
  }, [stateList, pendingState, setValue]);
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
          {/* <div className="max-w-md rounded-md border border-gray-300 bg-[#F8F9FB] p-4 flex justify-between items-start">
            <div className="flex gap-2">
              <img src="https://flagcdn.com/gb.svg" alt="UK" className="w-5 h-5 mt-0.5" />
              <div className="text-gray-800 leading-snug flex flex-col gap-1">
                <h3 className="font-semibold">{firstName + " " + lastName}</h3>
                {companyName && <span>{companyName}</span>}
                {phone && <span>{phone}</span>}
                {address && <span>{address}</span>}
                {city && <span>{city}</span>}
                {country && <span>{country}</span>}
                {zip && <span>{zip}</span>}
                {state && <span>{state}</span>}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              {!isAddressOverridden && (
                <button
                  type="button"
                  className="text-blue-600 hover:underline text-lg font-medium"
                  onClick={handleUseThisAddress}
                >
                  Use this address
                </button>
              )}
              
            </div>
          </div> */}
          {selectedCustomer && (
            <div className="w-full space-y-4">
              <h2 className="text-2xl font-semibold">Customer Addresses</h2>
              {addressesLoading ? (
                <div className="border rounded-md p-6 bg-gray-100 text-center">
                  Loading addresses...
                </div>
              ) : customerAddresses.length > 0 ? (
                <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4">
                  {customerAddresses.map((address: any) => (
                    <div key={address.id} className="border p-5 bg-gray-100 rounded-md">
                      <div className="space-y-2">
                        <div className="font-semibold text-2xl">
                          {address.first_name} {address.last_name}
                        </div>
                        {address.company_name && (
                          <div className="text-gray-800 text-xl">{address.company_name}</div>
                        )}
                        {address.phone_number && (
                          <div className="text-gray-800 text-xl">{address.phone_number}</div>
                        )}
                        {address.address_line_1 && (
                          <div className="text-gray-800 text-xl">{address.address_line_1}</div>
                        )}
                        {address.address_line_2 && (
                          <div className="text-gray-800 text-xl">{address.address_line_2}</div>
                        )}
                        {address.city && (
                          <div className="text-gray-800 text-xl">{address.city}</div>
                        )}
                        {address.state && (
                          <div className="text-gray-800 text-xl">{address.state}</div>
                        )}
                        {address.zip && (
                          <div className="text-gray-800 text-xl">{address.zip}</div>
                        )}
                        {address.country && (
                          <div className="text-gray-800 text-xl">{address.country}</div>
                        )}
                        {address.address_type && (
                          <div className="text-gray-800 text-xl">{address.address_type}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        className="btn-primary mt-4 w-full"
                        onClick={() => handleUseAddress(address)}
                      >
                        Use this address
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md p-6 bg-gray-100 text-center">
                  <p className="text-gray-500 text-xl">No saved addresses found.</p>
                </div>
              )}
            </div>
          )}
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
