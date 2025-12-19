"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { countriesList } from "@/const/location";
import CustomerSearchDropdown, { Customer } from "./CustomerSearchDropdown";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
export default function StepOne({ step, setStep, isEditMode }: any) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  console.log("Selected Customer from Dropdown: ", selectedCustomer);

  const onSubmit = (formData: any) => {
    if (orderType === "existing" && !selectedCustomer) {
      alert("Please select an customer before proceeding.");
      return;
    }

    console.log("Step 1 Submitted:", formData);
    setStep(step + 1);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };
  const country = watch("country");
  const orderType = watch("orderType");
  useEffect(() => {
    setValue("orderType", "existing");
  }, [setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 p-10">
        {/* Customer Info */}
        <h1 className="!text-4xl 2xl:!text-[2.4rem] !font-bold">Customer information</h1>
        <div className="p-6 bg-white rounded-sm shadow-md">
          <div className="flex items-center gap-6 my-4">
            <Label className="2xl:!text-2xl">Order for:</Label>
            <RadioGroup
              defaultValue="existing"
              className="flex gap-6"
              onValueChange={(value) => setValue("orderType", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="existing" />
                <Label className="2xl:!text-2xl" htmlFor="existing">Existing customer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label className="2xl:!text-2xl" htmlFor="new">New customer</Label>
              </div>
            </RadioGroup>
          </div>
          {orderType === "existing" && (
            <div className="flex flex-col gap-2 my-4">
              <Label className="2xl:!text-2xl" htmlFor="search">Search</Label>
              <CustomerSearchDropdown
                value={watch("search")}
                onChange={(val) => setValue("search", val)}
                onSelect={(customer) => {
                  // Always deep-clone or pick fields to avoid proxy issues
                  const safeCustomer = JSON.parse(JSON.stringify(customer));

                  // Store safely in local state
                  setSelectedCustomer(safeCustomer);

                  // Only save the customer ID or minimal info in form state
                  setValue("selectedCustomer", safeCustomer || "");
                }}
              />
            </div>
          )}

          {orderType === "new" && (
            <div className="space-y-4">
              <Label className="block font-medium 2xl:!text-2xl">Account details</Label>

              <div className="ml-40 space-y-10">
                <div>
                  <Label className="2xl:!text-2xl" htmlFor="email">Email Address</Label>
                  <Input {...register("email")} id="email" />
                </div>

                <div>
                  <Label className="2xl:!text-2xl" htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    {...register("password", {
                      required:
                        orderType === "new" ? "Password is required" : false,
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    id="password"
                  />
                  {typeof errors.password?.message === "string" && (
                    <p className="!text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="2xl:!text-2xl" htmlFor="password_confirmation">
                    Confirm Password
                  </Label>
                  <Input
                    type="password"
                    {...register("password_confirmation", {
                      required:
                        orderType === "new"
                          ? "Confirm password is required"
                          : false,
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    id="password_confirmation"
                  />
                  {typeof errors.password_confirmation?.message ===
                    "string" && (
                    <p className="!text-red-500 text-sm">
                      {errors.password_confirmation.message}
                    </p>
                  )}

                  <p className="!text-lg !text-gray-500 mt-1">
                    Adding a password will create a new customer account, not
                    applicable to Draft Order.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exclusiveOffers"
                    {...register("exclusiveOffers")}
                  />
                  <Label className="2xl:!text-2xl" htmlFor="exclusiveOffers">
                    I would like to receive updates and offers.
                  </Label>
                </div>

                <div>
                  <Label className="2xl:!text-2xl" htmlFor="customerGroup">Customer group</Label>
                  <Select
                    onValueChange={(value) => setValue("customerGroup", value)}
                    defaultValue="none"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Do not assign to any group --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        -- Do not assign to any group --
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <div className=" mt-4">
            <span className="2xl:!text-2xl">Selected customer</span> – {/* Placeholder */}
          </div>
        </div>

        {/* Billing Info */}
        <h1 className="mb-6 2xl:!text-[2.4rem]">Billing Information</h1>
        <div className=" p-6 bg-white rounded-sm shadow-md">
          <div className="flex-1 justify-around grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-5">
              <div>
                <Label className="2xl:!text-2xl" htmlFor="firstName">First Name</Label>
                <Input
                  {...register("firstName")}
                  id="firstName"
                  className="mt-1"
                  required={!isEditMode}
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="lastName">Last Name</Label>
                <Input
                  {...register("lastName")}
                  id="lastName"
                  className="mt-1"
                  required={!isEditMode}
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="companyName">
                  Company Name{" "}
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </Label>
                <Input
                  {...register("companyName")}
                  id="companyName"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="phoneNumber">
                  Phone Number{" "}
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </Label>
                <Input
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="address1">Address Line 1</Label>
                <Input
                  {...register("address1")}
                  id="address1"
                  className="mt-1"
                  required={!isEditMode}
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="address2">
                  Address Line 2{" "}
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </Label>
                <Input
                  {...register("address2")}
                  id="address2"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="city">Suburb/City</Label>
                <Input
                  {...register("city")}
                  id="city"
                  className="mt-1"
                  required={!isEditMode}
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="country">Country</Label>
                <Select
                  value={country}
                  onValueChange={(value) => setValue("country", value)}
                  required={!isEditMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent className="overflow-y-scroll h-96">
                    {countriesList.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="state">State/Province</Label>
                <Input
                  {...register("state")}
                  id="state"
                  className="mt-1"
                  required={!isEditMode}
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="zip">Zip/Postcode</Label>
                <Input {...register("zip")} id="zip" className="mt-1" />
              </div>
            </div>

            <div>
              {/* Right side: Selected Customer Box */}
              {selectedCustomer && (
                <div className="w-96 text-center border p-4 bg-gray-100 rounded-md  flex flex-col justify-between">
                  <div className=" flex flex-col gap-2">
                    <div className="font-semibold text-2xl">
                      {selectedCustomer.firstName} {selectedCustomer.lastName}
                    </div>
                    <div className="text-gray-800  text-xl">
                      {selectedCustomer.email}
                    </div>
                    {selectedCustomer.phone && (
                      <div className="text-gray-800 text-xl">
                        {selectedCustomer.phone}
                      </div>
                    )}
                    {selectedCustomer.companyName && (
                      <div className="text-gray-800 text-xl">
                        {selectedCustomer.companyName}
                      </div>
                    )}
                    {selectedCustomer.address && (
                      <div className="text-gray-800 text-xl">
                        {selectedCustomer.address}
                      </div>
                    )}
                    {selectedCustomer.state && (
                      <div className="text-gray-800 text-xl">
                        {selectedCustomer.state}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn-primary mt-4"
                    onClick={() => {
                      setValue("firstName", selectedCustomer.firstName);
                      setValue("lastName", selectedCustomer.lastName);
                      setValue(
                        "companyName",
                        selectedCustomer.companyName || ""
                      );
                      setValue("phoneNumber", selectedCustomer.phone || "");
                      setValue("address1", selectedCustomer.address || "");
                      setValue("city", selectedCustomer.city || "");
                      setValue("state", selectedCustomer.state || "");
                      setValue("zip", selectedCustomer.zip || "");
                      setValue("country", selectedCustomer.country || "");
                    }}
                  >
                    Use this address
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="saveAddress" defaultChecked />
            <Label className="2xl:!text-2xl" htmlFor="saveAddress">Save to customer’s address book</Label>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className="btn-outline-primary"
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Next
        </button>
      </div>
    </form>
  );
}
