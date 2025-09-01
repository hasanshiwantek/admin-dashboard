// "use client";
// import { useState } from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import ShippingMethod from "./ShippingMethod";

// export default function SingleAddressForm() {
//   const { register, control, watch, setValue,getValues } = useFormContext();
//   const [originalShippingValues, setOriginalShippingValues] =
//     useState<any>(null);
//   const [isAddressOverridden, setIsAddressOverridden] = useState(false);

//   const selectedCustomer = watch("selectedCustomer");
//   console.log("Selected Customer from step 3: ",selectedCustomer);
//   const {
//     firstName,
//     lastName,
//     companyName,
//     phone,
//     address,
//     city,
//     country,
//     state,
//     zip,
//   } = selectedCustomer || {};
//   const data = getValues();

//   const handleUseThisAddress = () => {
//     if (!selectedCustomer) return;

//     // Backup current values before overriding
//     const currentValues = {
//       firstName: watch("firstName"),
//       lastName: watch("lastName"),
//       companyName: watch("companyName"),
//       phoneNumber: watch("phoneNumber"),
//       address1: watch("address1"),
//       address2: watch("address2"),
//       city: watch("city"),
//       country: watch("country"),
//       state: watch("state"),
//       zip: watch("zip"),
//     };

//     setOriginalShippingValues(currentValues);
//     setIsAddressOverridden(true);

//     // Now override
//     // const [firstName = "", lastName = ""] = name?.split(" ") || [];

//     setValue("shipping.firstName", firstName);
//     setValue("shipping.lastName", lastName);
//     setValue("shipping.companyName", companyName || "");
//     setValue("shipping.phoneNumber", phone || "");
//     setValue("shipping.address1", address || "");
//     setValue("shipping.address2", "");
//     setValue("shipping.city", city || "");
//     setValue("shipping.country", country || "");
//     setValue("shipping.state", state || "");
//     setValue("shipping.zip", zip || "");
//   };
//   const handleRevert = () => {
//     if (!originalShippingValues) return;

//     Object.entries(originalShippingValues).forEach(([key, value]) => {
//       setValue(`shipping.${key}`, value || "");
//     });

//     setIsAddressOverridden(false);
//     setOriginalShippingValues(null);
//   };

//   return (
//     <div className="space-y-8">
//       <div className="rounded-md space-y-5">
//         <h2 className="!font-bold !text-2xl border-b py-2">Shipping address</h2>

//         <div className="grid grid-cols-2 gap-4">
//           {/* Form inputs */}
//           <div className="grid grid-cols-1 gap-4">
//             <Input
//               {...register("shipping.firstName")}
//               placeholder="First Name"
//             />
//             <Input {...register("shipping.lastName")} placeholder="Last Name" />
//             <Input
//               {...register("shipping.companyName")}
//               placeholder="Company Name (Optional)"
//             />
//             <Input
//               {...register("shipping.phoneNumber")}
//               placeholder="Phone Number (Optional)"
//             />
//             <Input
//               {...register("shipping.address1")}
//               placeholder="Address Line 1"
//             />
//             <Input
//               {...register("shipping.address2")}
//               placeholder="Address Line 2 (Optional)"
//             />
//             <Input {...register("shipping.city")} placeholder="Suburb/City" />

//             <Controller
//               name="shipping.country"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   value={field.value || ""}
//                   onValueChange={field.onChange}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Country" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="PK">Pakistan</SelectItem>
//                     <SelectItem value="US">United States</SelectItem>
//                     <SelectItem value="UK">United Kingdom</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />

//             <Input
//               {...register("shipping.state")}
//               placeholder="State/Province"
//             />
//             <Input {...register("shipping.zip")} placeholder="Zip/Postcode" />
//           </div>

//           {/* Address preview card */}
//           <div>
//             <div className="max-w-md rounded-md border border-gray-300 bg-[#F8F9FB] p-4 flex justify-between items-start">
//               <div className="flex gap-2">
//                 <img
//                   src="https://flagcdn.com/gb.svg"
//                   alt="UK"
//                   className="w-5 h-5 mt-0.5"
//                 />
//                 <div className="text-gray-800 leading-snug flex flex-col gap-1">
//                   <h3 className="font-semibold">
//                     {firstName + " " + lastName}
//                   </h3>
//                   {companyName && <span>{companyName}</span>}
//                   {phone && <span>{phone}</span>}
//                   {address && <span>{address}</span>}
//                   {city && <span>{city}</span>}
//                   {country && <span>{country}</span>}
//                   {zip && <span>{zip}</span>}
//                   {state && <span>{state}</span>}
//                 </div>
//               </div>

//               <div className="flex flex-col items-end gap-1">
//                 {!isAddressOverridden && (
//                   <button
//                     type="button"
//                     className="text-blue-600 hover:underline text-lg font-medium"
//                     onClick={handleUseThisAddress}
//                   >
//                     Use this address
//                   </button>
//                 )}

//                 {isAddressOverridden && (
//                   <button
//                     type="button"
//                     className="text-red-600 hover:underline text-lg font-medium"
//                     onClick={handleRevert}
//                   >
//                     Revert changes
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center space-x-2 pt-2">
//           <Controller
//             name="shipping.saveToAddressBook"
//             control={control}
//             render={({ field }) => (
//               <Checkbox
//                 checked={!!field.value}
//                 onCheckedChange={field.onChange}
//               />
//             )}
//           />
//           <Label>Save to customer's address book</Label>
//         </div>
//       </div>

//       <ShippingMethod />
//     </div>
//   );
// }










"use client";
import { useEffect, useState } from "react";
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

export default function SingleAddressForm() {
  const { register, control, watch, setValue, getValues } = useFormContext();
  const [originalShippingValues, setOriginalShippingValues] = useState<any>(null);
  const [isAddressOverridden, setIsAddressOverridden] = useState(false);

  const selectedCustomer = watch("selectedCustomer");

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
    } = getValues();

    setValue("shipping.firstName", firstName || "");
    setValue("shipping.lastName", lastName || "");
    setValue("shipping.companyName", companyName || "");
    setValue("shipping.phoneNumber", phoneNumber || "");
    setValue("shipping.address1", address1 || "");
    setValue("shipping.address2", address2 || "");
    setValue("shipping.city", city || "");
    setValue("shipping.country", country || "");
    setValue("shipping.state", state || "");
    setValue("shipping.zip", zip || "");

    // Mark as overridden so "Revert" won't reset this default
    // setIsAddressOverridden(true);
  }, []);

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
                <Select value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PK">Pakistan</SelectItem>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Input {...register("shipping.state")} placeholder="State/Province" />
            <Input {...register("shipping.zip")} placeholder="Zip/Postcode" />
          </div>

          {/* Address preview */}
          <div>
            <div className="max-w-md rounded-md border border-gray-300 bg-[#F8F9FB] p-4 flex justify-between items-start">
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
                {isAddressOverridden && (
                  <button
                    type="button"
                    className="text-red-600 hover:underline text-lg font-medium"
                    onClick={handleRevert}
                  >
                    Revert changes
                  </button>
                )}
              </div>
            </div>
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
