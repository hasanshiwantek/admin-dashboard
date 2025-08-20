"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { addCustomer } from "@/redux/slices/customerSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { countriesList, statesList } from "@/const/location";
const AddCustomer = () => {
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    customerGroup: "",
    phone: "",
    storeCredit: "0.00",
    acsEmail: true,
    forceReset: false,
    taxCode: "",
    password: "",
    confirmPassword: "",
    analytics: "",
    functional: "",
    targeting: "",
    address: "",
    state: "",
    country: "",
  });

  const dispatch = useAppDispatch();

  const updateField = (field: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form reload
    const payload = {
      first_name: formData?.firstName,
      last_name: formData?.lastName,
      company_name: formData?.companyName,
      email: formData?.email,
      customer_group: formData?.customerGroup,
      phone: formData?.phone,
      country: formData?.country,
      state: formData?.state,
      address: formData?.address,
      store_credit: formData?.storeCredit,
      receive_review_emails: formData?.acsEmail,
      force_password_reset: formData?.forceReset,
      tax_exempt_code: formData?.taxCode,
      password: formData?.password,
      confirm_password: formData?.confirmPassword,
      analytics: formData?.analytics,
      fuctional: formData?.functional,
      targeting: formData?.targeting,
    };
    console.log("Submitted Data:", payload);

    try {
      const resultAction = await dispatch(addCustomer({ data: payload }));

      if (addCustomer.fulfilled.match(resultAction)) {
        console.log("Customer added successfully:", resultAction.payload);
      } else {
        // handle rejected case
        const errorMessage = resultAction.payload || "Order placement failed";
        console.log(errorMessage);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-10">
          {/* Header */}
          <div className="mb-6">
            <h1 className=" !font-light">Add customer</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b mb-6">
            <button
              className="pb-2 text-xl font-medium border-b-2 border-blue-500"
              type="button"
            >
              Customer details
            </button>
            <button
              className="pb-2 text-xl font-medium text-gray-500"
              type="button"
            >
              Custom address book
            </button>
          </div>

          <div className="p-6">
            <h1 className="!font-semibold mb-4">Customer details</h1>

            <div className="bg-white p-6 rounded-md border space-y-9 ">
              {/* First Name */}
              <div className="space-y-1">
                <Label>First name</Label>
                <Input
                  placeholder=""
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <Label>Last name</Label>
                <Input
                  placeholder=""
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                />
              </div>

              {/* Company Name */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Label>Company name</Label>
                  <span className="text-sm text-muted-foreground">
                    (optional)
                  </span>
                </div>
                <Input
                  placeholder=""
                  value={formData.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder=""
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label>Address</Label>
                <Textarea
                  className="w-[28rem] h-[60px]"
                  rows={10}
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label>Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => updateField("country", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="overflow-y-scroll h-96">
                    {countriesList?.map((c, index) => (
                      <SelectItem key={index} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>State</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => updateField("state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="overflow-y-scroll h-96">
                    {statesList?.map((c) => (
                      <SelectItem key={c.value} value={c.label}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Group */}
              <div className="space-y-1">
                <Label>Customer group</Label>
                <Select
                  value={formData.customerGroup}
                  onValueChange={(value) => updateField("customerGroup", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Label>Phone</Label>
                  <span className="text-xs text-muted-foreground">
                    (optional)
                  </span>
                </div>
                <Input
                  placeholder=""
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>

              {/* Store Credit */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Label className="flex items-center gap-1">
                    Store credit
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    (optional)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">$</span>
                  <Input
                    placeholder="0.00"
                    value={formData.storeCredit}
                    onChange={(e) => updateField("storeCredit", e.target.value)}
                  />
                </div>
              </div>

              {/* ACS Emails */}
              <div className="space-y-1">
                <Label className="flex items-center gap-1">
                  Receive ACS/review emails
                  <Info className="w-3 h-3 text-muted-foreground" />
                </Label>
                <Select
                  value={formData.acsEmail ? "true" : "false"}
                  onValueChange={(value) =>
                    updateField("acsEmail", value === "true")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Yes or No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Force Password Reset */}
              <div className="space-y-1">
                <Label className="flex items-center gap-1">
                  Force password reset on next login
                  <Info className="w-3 h-3 text-muted-foreground" />
                </Label>
                <Select
                  value={formData.forceReset ? "true" : "false"}
                  onValueChange={(value) =>
                    updateField("forceReset", value === "true")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Yes or No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tax Exempt Code */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Label>Tax exempt code</Label>
                  <span className="text-xs text-muted-foreground">
                    (optional)
                  </span>
                </div>
                <Input
                  placeholder=""
                  value={formData.taxCode}
                  onChange={(e) => updateField("taxCode", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <h1 className=" !font-semibold mb-4">Data Prefernces</h1>

            <div className="bg-white p-6 border rounded-md space-y-7 ">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Label>Analytics</Label>
                </div>
                <Select
                  value={formData.analytics}
                  onValueChange={(value) => updateField("analytics", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Not set" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notSet">Not Set</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Label>Functional</Label>
                </div>
                <Select
                  value={formData.functional}
                  onValueChange={(value) => updateField("functional", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Not set" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notSet">Not Set</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Label>Targeting/Advertising</Label>
                </div>
                <Select
                  value={formData.targeting}
                  onValueChange={(value) => updateField("targeting", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Not set" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notSet">Not Set</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h1 className=" !font-semibold mb-4">Password</h1>

            <div className="bg-white p-6 border rounded-md space-y-7 ">
              <TooltipProvider>
                {/* Password Field */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Label>Password</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <>
                          Specify the password this customer should use to log
                          in to your store. Once logged in, the customer can
                          view past orders, submit return requests, etc.
                        </>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Passwords must be at least 7 characters long and contain
                    both alphabetic and numeric characters.
                  </p>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Label>Confirm password</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <>
                          Confirm the password entered above by entering it
                          again.
                        </>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateField("confirmPassword", e.target.value)
                    }
                  />
                </div>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
          <button className="!text-xl p-4 !text-blue-500" type="button">
            Cancel
          </button>
          <button type="button" className="btn-outline-primary">
            Save and add another
          </button>
          <button type="submit" className="btn-primary">
            Add customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
