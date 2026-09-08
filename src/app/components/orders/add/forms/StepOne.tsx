"use client";
import { useEffect, useMemo, useState } from "react";
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
import { fetchCustomerAddresses } from "@/redux/slices/customerSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Country, State } from "country-state-city";
import { useFormContext } from "react-hook-form";
export default function StepOne({ step, setStep, isEditMode }: any) {
   interface CustomerAddress {
  id: number;
  customer_id: number;
  first_name: string;
  last_name: string;
  company_name?: string | null;
  phone_number?: string | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  address_type?: string | null;
  is_default?: boolean;
}
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const router = useRouter();
const dispatch = useDispatch<any>();
  const [customerAddresses, setCustomerAddresses] = useState<CustomerAddress[]>([]);
  const [pendingState, setPendingState] = useState("");
const [loadingAddresses, setLoadingAddresses] = useState(false);
    const countryList = Country.getAllCountries().map((c) => ({
    name: c.name,
    code: c.isoCode,
  }));
 
   const [formData, setFormData] = useState({
      // Advanced Search
      searchKeywords: "",
      startsWith: "",
      phone: "",
      country: "",
      stateProvince: "",
  
      // Range Search
      customerIdFrom: "",
      customerIdTo: "",
      ordersFrom: "",
      ordersTo: "",
      creditFrom: "",
      creditTo: "",
  
      // Date Search
      dateJoined: "",
  
      // Group Search
      customerGroup: "",
  
      // Sort Order
      sortBy: "",
      sortOrder: "",
    });
      const stateList = useMemo(() => {
      if (!formData.country) return [];
  
      return State.getStatesOfCountry(formData.country).map((s) => ({
        name: s.name,
        code: s.isoCode,
      }));
    }, [formData.country]);
  
  useEffect(() => {
  if (!pendingState || stateList.length === 0) return;

  const stateExists = stateList.some(
    (state) => state.code === pendingState
  );

  if (stateExists) {
    setFormData((prev) => ({
      ...prev,
      stateProvince: pendingState,
    }));

    setValue("billingState", pendingState);

    setPendingState("");
  }
}, [stateList, pendingState, setValue]);
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const onSubmit = (formData: any) => {
    if (orderType === "existing" && !selectedCustomer) {
      alert("Please select an customer before proceeding.");
      return;
    }

    setStep(step + 1);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };
  const country = watch("billingCountry");
  const orderType = watch("orderType");
  useEffect(() => {
    setValue("orderType", "existing");
  }, [setValue]);

  // Add this useEffect in StepOne component
  useEffect(() => {
    const formCustomer = watch("selectedBillingCustomer");
    if (formCustomer && isEditMode) {
      setSelectedCustomer(formCustomer);
    }
  }, [watch("selectedBillingCustomer"), isEditMode]);
const handleUseAddress = (address: CustomerAddress) => {
  setValue("billingFirstName", address.first_name ?? "");
  setValue("billingLastName", address.last_name ?? "");
  setValue("billingCompanyName", address.company_name ?? "");
  setValue("billingPhoneNumber", address.phone_number ?? "");

  setValue("billingAddress1", address.address_line_1 ?? "");
  setValue("billingAddress2", address.address_line_2 ?? "");

  setValue("billingCity", address.city ?? "");
  setValue("billingZip", address.zip ?? "");

  // Country
  setValue("billingCountry", address.country ?? "");

  // State ko temporarily save karo
  setPendingState(address.state ?? "");

  // Existing Country/State formData
  setFormData((prev) => ({
    ...prev,
    country: address.country ?? "",
    stateProvince: "",
  }));
};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 p-10">
        {/* Customer Info */}
        <h1 className="!text-4xl 2xl:!text-[2.4rem] !font-bold">
          Customer information
        </h1>
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
                <Label className="2xl:!text-2xl" htmlFor="existing">
                  Existing customer
                </Label>
              </div>
              {!isEditMode && <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label className="2xl:!text-2xl" htmlFor="new">
                  New customer
                </Label>
              </div>}
            </RadioGroup>
          </div>
          {orderType === "existing" && (
            <div className="flex flex-col gap-2 my-4">
              <Label className="2xl:!text-2xl" htmlFor="search">
                Search
              </Label>
              <CustomerSearchDropdown
                value={watch("search")}
                onChange={(val) => setValue("search", val)}
               onSelect={async (customer) => {
  const safeCustomer = JSON.parse(JSON.stringify(customer));

  setSelectedCustomer(safeCustomer);
  setValue("selectedCustomer", safeCustomer);

  const customerId = Number(safeCustomer?.id);

  if (!customerId) {
    console.log("Customer ID not found");
    setCustomerAddresses([]);
    return;
  }

  try {
    setLoadingAddresses(true);

    const response = await dispatch(
      fetchCustomerAddresses({ customerId })
    ).unwrap();

    console.log("Customer Addresses:", response);

    setCustomerAddresses(
  response?.data?.customer_addresses || []
);
  } catch (error) {
    console.error("Failed to fetch customer addresses:", error);
    setCustomerAddresses([]);
  } finally {
    setLoadingAddresses(false);
  }
}}
              />
            </div>
          )}

          {orderType === "new" && (
            <div className="space-y-4">
              <Label className="block font-medium 2xl:!text-2xl">
                Account details
              </Label>

              <div className="ml-40 space-y-10">
                <div>
                  <Label className="2xl:!text-2xl" htmlFor="email">
                    Email Address
                  </Label>
                  <Input {...register("email")} id="email" />
                </div>

                <div>
                  <Label className="2xl:!text-2xl" htmlFor="password">
                    Password
                  </Label>
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
                  <Label
                    className="2xl:!text-2xl"
                    htmlFor="password_confirmation"
                  >
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

                {/* <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exclusiveOffers"
                    {...register("exclusiveOffers")}
                  />
                  <Label className="2xl:!text-2xl" htmlFor="exclusiveOffers">
                    I would like to receive updates and offers.
                  </Label>
                </div> */}

                {/* <div>
                  <Label className="2xl:!text-2xl" htmlFor="customerGroup">
                    Customer group
                  </Label>
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
                </div> */}
              </div>
            </div>
          )}
          <div className="mt-4">
            <span className="2xl:!text-2xl font-medium">
              Selected customer:{" "}
            </span>
            {orderType === "existing" ? (
              selectedCustomer ? (
                <span className="text-blue-600 2xl:!text-2xl">
                  {selectedCustomer.firstName} {selectedCustomer.lastName}
                </span>
              ) : (
                <span className="text-gray-400 2xl:!text-2xl">None</span>
              )
            ) : watch("firstName") && watch("lastName") ? (
              <span className="text-green-600 2xl:!text-2xl">
                {watch("firstName")} {watch("lastName")}
              </span>
            ) : (
              <span className="text-gray-400 2xl:!text-2xl">None</span>
            )}
          </div>
        </div>

        {/* Billing Info */}
        <h1 className="mb-6 2xl:!text-[2.4rem]">Billing Information</h1>
        <div className=" p-6 bg-white rounded-sm shadow-md">
          <div className="flex-1 justify-around grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-5">
              <div>
                <Label className="2xl:!text-2xl" htmlFor="firstName">
                  First Name
                </Label>
                <Input
                  {...register("billingFirstName")}
                  id="firstName"
                  className="mt-1"
                  required={!isEditMode}
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="lastName">
                  Last Name
                </Label>
                <Input
                  {...register("billingLastName")}
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
                  {...register("billingCompanyName")}
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
                  {...register("billingPhoneNumber")}
                  id="phoneNumber"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="address1">
                  Address Line 1
                </Label>
                <Input
                  {...register("billingAddress1")}
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
                  {...register("billingAddress2")}
                  id="address2"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="city">
                  Suburb/City
                </Label>
                <Input
                  {...register("billingCity")}
                  id="city"
                  className="mt-1"
                  required={!isEditMode}
                />
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="country">
                  Country
                </Label>
           <Select
                      name="country"
                      value={formData?.country || ""}
                      onValueChange={(value) => {
                        handleChange({ target: { name: "country", value } });
                        handleChange({ target: { name: "stateProvince", value: "" } });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="-- Choose a country --" />
                      </SelectTrigger>
                      <SelectContent className="overflow-y-scroll h-96">
                        {countryList.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="state">
                  State/Province
                </Label>
                 <Select
                      name="stateProvince"
                      value={formData?.stateProvince || ""}
                      onValueChange={(value) =>
                        handleChange({
                          target: { name: "stateProvince", value },
                        })
                      }
                      disabled={!formData.country}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="-- Choose a state/province --" />
                      </SelectTrigger>
                      <SelectContent className="overflow-y-scroll h-96">
                        {stateList.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
              </div>

              <div>
                <Label className="2xl:!text-2xl" htmlFor="zip">
                  Zip/Postcode
                </Label>
                <Input {...register("billingZip")} id="zip" className="mt-1" />
              </div>
            </div>

           <div>
  {selectedCustomer && (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-semibold">
        Customer Addresses
      </h2>

      {loadingAddresses ? (
        <div className="border rounded-md p-6 bg-gray-100 text-center">
          Loading addresses...
        </div>
      ) : customerAddresses.length > 0 ? (
        
       <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4">
  {customerAddresses.map((address) => (
    <div
      key={address.id}
      className="border p-5 bg-gray-100 rounded-md"
    >
      <div className="space-y-2">
        <div className="font-semibold text-2xl">
          {address.first_name} {address.last_name}
        </div>

        {address.company_name && (
          <div className="text-gray-800 text-xl">
            {address.company_name}
          </div>
        )}

        {address.phone_number && (
          <div className="text-gray-800 text-xl">
            {address.phone_number}
          </div>
        )}

        {address.address_line_1 && (
          <div className="text-gray-800 text-xl">
            {address.address_line_1}
          </div>
        )}

        {address.address_line_2 && (
          <div className="text-gray-800 text-xl">
            {address.address_line_2}
          </div>
        )}

        {address.city && (
          <div className="text-gray-800 text-xl">
            {address.city}
          </div>
        )}

        {address.state && (
          <div className="text-gray-800 text-xl">
            {address.state}
          </div>
        )}

        {address.zip && (
          <div className="text-gray-800 text-xl">
            {address.zip}
          </div>
        )}

        {address.country && (
          <div className="text-gray-800 text-xl">
            {address.country}
          </div>
        )}

        {address.address_type && (
          <div className="text-gray-800 text-xl">
            {address.address_type}
          </div>
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
          <p className="text-gray-500 text-xl">
            No saved addresses found.
          </p>
        </div>
      )}
    </div>
  )}
</div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox {...register("saveAddress")} id="saveAddress" defaultChecked />
            <Label className="2xl:!text-2xl" htmlFor="saveAddress">
              Save to customer’s address book
            </Label>
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
