"use client";
import { useEffect } from "react";
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
import CustomerSearchDropdown from "./CustomerSearchDropdown";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
export default function StepOne({  step, setStep,isEditMode }: any) {
const { register, handleSubmit, setValue, watch } = useFormContext();

  const router = useRouter();
  const onSubmit = (formData: any) => {
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
        <h1 className="!text-4xl !font-bold">Customer information</h1>
        <div className="p-6 bg-white rounded-sm shadow-md">
          <div className="flex items-center gap-6 my-4">
            <Label>Order for:</Label>
            <RadioGroup
              defaultValue="existing"
              className="flex gap-6"
              onValueChange={(value) => setValue("orderType", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="existing" />
                <Label htmlFor="existing">Existing customer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">New customer</Label>
              </div>
            </RadioGroup>
          </div>
          {orderType === "existing" && (
            <div className="flex flex-col gap-2 my-4">
              <Label htmlFor="search">Search</Label>
              <CustomerSearchDropdown
                value={watch("search")}
                onChange={(val) => setValue("search", val)}
                onSelect={(customer) => {
                  setValue("selectedCustomer", customer); // save selected customer
                }}
              />
            </div>
          )}

          {orderType === "new" && (
            <div className="space-y-4">
              <Label className="block font-medium">Account details</Label>

              <div className="ml-40 space-y-10">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input {...register("email")} id="email" />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    {...register("password")}
                    id="password"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    {...register("confirmPassword")}
                    id="confirmPassword"
                  />
                  <p className="!text-sm !text-gray-500 mt-1">
                    Adding a password will create a new customer account, not
                    applicable to Draft Order.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exclusiveOffers"
                    {...register("exclusiveOffers")}
                  />
                  <Label htmlFor="exclusiveOffers">
                    I would like to receive updates and offers.
                  </Label>
                </div>

                <div>
                  <Label htmlFor="customerGroup">Customer group</Label>
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
            <span>Selected customer</span> – {/* Placeholder */}
          </div>
        </div>

        {/* Billing Info */}
        <h1 className="mb-6">Billing Information</h1>
        <div className=" p-6 bg-white rounded-sm shadow-md">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                {...register("firstName")}
                id="firstName"
                className="mt-1"
                required={
                  !isEditMode
                }
              />
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                {...register("lastName")}
                id="lastName"
                className="mt-1"
                   required={
                  !isEditMode
                }
              />
            </div>

            <div>
              <Label htmlFor="companyName">
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
              <Label htmlFor="phoneNumber">
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
              <Label htmlFor="address1">Address Line 1</Label>
              <Input
                {...register("address1")}
                id="address1"
                className="mt-1"
                     required={
                  !isEditMode
                }
              />
            </div>

            <div>
              <Label htmlFor="address2">
                Address Line 2{" "}
                <span className="text-gray-400 text-xs">(Optional)</span>
              </Label>
              <Input {...register("address2")} id="address2" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="city">Suburb/City</Label>
              <Input
                {...register("city")}
                id="city"
                className="mt-1"
                required={
                  !isEditMode
                }
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                value={country}
                onValueChange={(value) => setValue("country", value)}
                     required={
                  !isEditMode
                }
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
              <Label htmlFor="state">State/Province</Label>
              <Input
                {...register("state")}
                id="state"
                className="mt-1"
                     required={
                  !isEditMode
                }
              />
            </div>

            <div>
              <Label htmlFor="zip">Zip/Postcode</Label>
              <Input {...register("zip")} id="zip" className="mt-1" />
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="saveAddress" defaultChecked />
            <Label htmlFor="saveAddress">Save to customer’s address book</Label>
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
