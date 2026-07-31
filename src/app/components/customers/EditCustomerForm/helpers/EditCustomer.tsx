"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Info, ArrowLeft, Plus, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { addCustomer, customerAddressesDeleteMultiple, fetchCustomerAddresses } from "@/redux/slices/customerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { countriesList, statesList } from "@/const/location";
import { useRouter, useParams } from "next/navigation";
import {
    fetchCustomerById,
    updateCustomer,
} from "@/redux/slices/customerSlice";
import Link from "next/link";

const EditCustomer = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { customerAddresses, addressesLoading } = useAppSelector(
        (state: any) => state.customer
    );

    const isEdit = !!id;
    const [saveAndAddAnother, setSaveAndAddAnother] = useState(false);

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
        notes: "",
    });

    const updateField = (field: any, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Toggle single checkbox
    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Select / Deselect all
    const toggleSelectAll = () => {
        if (selectedIds.length === customerAddresses.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(customerAddresses.map((addr: any) => addr.id));
        }
    };

    // Bulk Delete
    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${selectedIds.length} address(es)?`
        );
        if (!confirmDelete) return;

        try {
            const result = await dispatch(
                customerAddressesDeleteMultiple({ data: { ids: selectedIds } })
            );

            if (result.meta.requestStatus === "fulfilled") {
                // Refresh list
                dispatch(fetchCustomerAddresses({ customerId: Number(id) }));
                setSelectedIds([]);
            } else {
                alert("Failed to delete addresses");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };
    useEffect(() => {
        if (isEdit) {
            dispatch(fetchCustomerById({ id: id })).then((res: any) => {
                const c = res.payload.data;
                if (c) {
                    setFormData({
                        firstName: c.firstName || "",
                        lastName: c.lastName || "",
                        companyName: c.companyName || "",
                        email: c.email || "",
                        customerGroup: c.customerGroup || "",
                        phone: c.phone || "",
                        storeCredit: c.storeCredit || "0.00",
                        acsEmail: c.receiveReviewEmails,
                        forceReset: c.forcePasswordReset,
                        taxCode: c.taxExemptCode || "",
                        password: "",
                        confirmPassword: "",
                        analytics: c.analytics || "",
                        functional: c.fuctional || "",
                        targeting: c.targeting || "",
                        address: c.address || "",
                        state: c.state || "",
                        country: c.country || "",
                        notes: c.notes || "",
                    });
                }
            });
        }
    }, [id, isEdit]);

    useEffect(() => {
        if (id) {
            dispatch(fetchCustomerAddresses({ customerId: Number(id) }));
        }
    }, [id]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            companyName: formData.companyName,
            email: formData.email,
            customerGroup: formData.customerGroup,
            phone: formData.phone,
            country: formData.country,
            state: formData.state,
            address: formData.address,
            storeCredit: formData.storeCredit,
            receiveReviewEmails: formData.acsEmail,
            forcePasswordReset: formData.forceReset,
            taxExemptCode: formData.taxCode,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
            analytics: formData.analytics,
            functional: formData.functional,
            targeting: formData.targeting,
            notes: formData.notes,
        };

        setLoading(true);
        try {
            const resultAction = isEdit
                ? await dispatch(updateCustomer({ id: id, data: payload }))
                : await dispatch(addCustomer({ data: payload }));

            if (resultAction.meta.requestStatus === "fulfilled") {
                if (saveAndAddAnother && !isEdit) {
                    setFormData({
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
                        notes: "",
                    });
                    setSaveAndAddAnother(false);
                } else {
                    setTimeout(() => {
                        router.push("/manage/customers/");
                    }, 700);
                }
            } else {
                alert("Customer save failed");
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("Unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#f6f7fb]  ">
            <form onSubmit={handleSubmit}>
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Back */}
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[#8C93AD] !text-[15px] hover:text-black mb-5"
                    >
                        <ArrowLeft size={17} />
                        <span className=" text-[#8C93AD] !text-[15px] !font-normal">Customers</span>
                    </button>

                    {/* Title */}
                    <h1 className="!text-[30px] !font-normal text-[#313440] mb-6">
                        {isEdit
                            ? `${formData.firstName} ${formData.lastName}`.trim() ||
                            "Update customer"
                            : "Add customer"}
                    </h1>

                    {/* Info Banner (only on edit) */}
                    {/* {isEdit && (
                        <div className="bg-[#eef3ff] border border-[#d0dcff] rounded-md p-4 mb-6 flex gap-3 items-start">
                            <Info size={18} className="text-[#4361ee] mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <p className="text-[14px] text-[#333] leading-relaxed">
                                    <span className="font-medium">
                                        New York Customer experience
                                    </span>
                                    <br />
                                    You’re using our new and improved Edit customer page. You can
                                    easily revert back to the legacy page design and leave
                                    feedback to help us make continuous improvements.{" "}
                                    <a href="#" className="text-[#4361ee] underline">
                                        Learn more
                                    </a>
                                </p>
                                <div className="flex gap-3 mt-3">
                                    <button
                                        type="button"
                                        className="h-8 px-4 border border-[#4361ee] text-[#4361ee] text-[13px] rounded-sm hover:bg-[#e8eeff]"
                                    >
                                        Give feedback
                                    </button>
                                    <button
                                        type="button"
                                        className="h-8 px-4 border border-[#4361ee] text-[#4361ee] text-[13px] rounded-sm hover:bg-[#e8eeff]"
                                    >
                                        Save feedback
                                    </button>
                                </div>
                            </div>
                        </div>
                    )} */}

                    {/* ==================== LOGIN DETAILS ==================== */}
                    <div className="bg-white border border-[#e5e7eb] rounded-md p-6 mb-5 w-full shadow-sm">
                        <h2 className="text-[22px] font-semibold text-[#313440] mb-5">
                            Login details
                        </h2>

                        <div className="space-y-5 w-full">
                            {/* Email */}
                            <div className="w-full">
                                <Label className="text-[15px] text-[#313440] mb-1.5 block">
                                    Address e-mail <span className="!text-red-500">*</span>
                                </Label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    required
                                    className="h-12 w-full max-w-none"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <Label className=" text-[15px] text-[#313440] mb-1.5 block">
                                    Mot de passe
                                </Label>
                                <p className="text-[12px] text-[#5E637A] mb-1.5">
                                    Words must be at least 5 characters and contain: lowercase
                                    letters, uppercase letters, at least 1 number, at least 1
                                    special character
                                </p>
                                <Input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => updateField("password", e.target.value)}
                                    required={!isEdit}
                                    disabled={isEdit}
                                    className="h-12 w-full max-w-none"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <p className="text-[15px] text-[#313440] mb-1.5 block">
                                   Confirmer le mot de passe
                                </p>
                                <Label  className="text-[12px] text-[#5E637A] mb-1.5" >
                                   Re-enter the password
                                </Label>
                                <Input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        updateField("confirmPassword", e.target.value)
                                    }
                                    required={!isEdit}
                                    disabled={isEdit}
                                   className="h-12 w-full max-w-none"
                                     placeholder="••••••••"
                                />
                            </div>

                            {/* Force Reset Checkbox */}
                            <div className="flex items-center gap-2 pt-1">
                                <Checkbox
                                    id="forceReset"
                                    checked={formData.forceReset}
                                    onCheckedChange={(checked) =>
                                        updateField("forceReset", checked)
                                    }
                                />
                                <label
                                    htmlFor="forceReset"
                                    className="text-[15px] text-[#313440] cursor-pointer"
                                >
                                    Request customer to set their password on next login
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ==================== CUSTOMER DETAILS ==================== */}
                    <div className="bg-white border border-[#e5e7eb] rounded-md p-6 mb-5">
                        <h2 className="!text-[22px] font-semibold text-[#313440] mb-5">
                            Customer details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5  w-full">
                            {/* First Name */}
                            <div>
                                <Label className="text-[15px] text-[#313440] mb-1.5 block">
                                    First name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={formData.firstName}
                                    onChange={(e) => updateField("firstName", e.target.value)}
                                    required
                                    className="h-12 max-w-none w-full"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <Label className="text-[15px] text-[#313440] mb-1.5 block">
                                    Last name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={formData.lastName}
                                    onChange={(e) => updateField("lastName", e.target.value)}
                                    required
                                     className="h-12 max-w-none w-full"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <Label className="text-[15px] text-[#313440] mb-1.5 block">
                                    Phone number
                                </Label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => updateField("phone", e.target.value)}
                                    className="h-12 max-w-none w-full"
                                />
                            </div>

                            {/* Store Credit */}
                            <div>
                                <Label className="text-[15px] text-[#313440] mb-1.5 block">
                                    Store credit
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[14px]">
                                        $
                                    </span>
                                    <Input
                                        value={formData.storeCredit}
                                        onChange={(e) => updateField("storeCredit", e.target.value)}
                                        className="h-10 pl-7 max-w-none w-full"
                                    />
                                </div>
                            </div>

                            {/* Customer Group */}
                            <div>
                                <Label className="text-[15px] text-[#313440] mb-1.5 block">
                                    Customer group <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.customerGroup}
                                    onValueChange={(value) => updateField("customerGroup", value)}
                                >
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Select group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="retail">Retail</SelectItem>
                                        <SelectItem value="vip">VIP</SelectItem>
                                        <SelectItem value="wholesale">Wholesale</SelectItem>
                                        <SelectItem value="No group">No group</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Company Name */}
                            <div>
                                <Label className="text-[15px] text-[#313440]mb-1.5 block">
                                    Company name
                                </Label>
                                <Input
                                    value={formData.companyName}
                                    onChange={(e) => updateField("companyName", e.target.value)}
                                    className="h-14 max-w-none w-full"
                                />
                            </div>

                            {/* Tax Exempt */}
                            <div className="md:col-span-2">
                                <Label className="text-[15px] text-[#313440] mb-1.5 block">
                                    Tax exempt code
                                </Label>
                                <Input
                                    value={formData.taxCode}
                                    onChange={(e) => updateField("taxCode", e.target.value)}
                                    className="h-12 max-w-none"
                                />
                            </div>
                        </div>

                        {/* Consent Checkbox */}
                        <div className="flex items-center gap-2 mt-6">
                            <Checkbox
                                id="acsEmail"
                                checked={formData.acsEmail}
                                onCheckedChange={(checked) => updateField("acsEmail", checked)}
                            />
                            <label
                                htmlFor="acsEmail"
                                className="text-[13px] text-[#333] cursor-pointer"
                            >
                                Consent to receive transactional and news/lifestyle emails
                            </label>
                        </div>
                    </div>

                    {/* ==================== DATA PREFERENCES ==================== */}
                    <div className="bg-white border border-[#e5e7eb] rounded-md p-6 mb-5 shadow-sm w-full">
                        <h2 className="!text-[22px] font-semibold text-[#313440] mb-5">
                            Data preferences
                        </h2>

                        <div className="space-y-4 w-full mb-2">
                            {[
                                { label: "Analytics", key: "analytics" },
                                { label: "Functional", key: "functional" },
                                { label: "Targeting / Advertising", key: "targeting" },
                            ].map((item) => (
                                <div key={item.key}>
                                    <Label className="text-[15px]  !text-[#313440] mb-1.5 block">
                                        {item.label}
                                    </Label>
                                    <Select
                                        value={formData[item.key]}
                                        onValueChange={(value) => updateField(item.key, value)}
                                    >
                                        <SelectTrigger className="h-10 !font-normal">
                                            <SelectValue placeholder="Not set" />
                                        </SelectTrigger>
                                        <SelectContent className="!font-normal">
                                            <SelectItem value="notSet">Not Set</SelectItem>
                                            <SelectItem value="accepted">Accepted</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* ==================== ADDRESS BOOK ==================== */}
                    <div className="bg-white border border-[#e5e7eb] rounded-md p-6 mb-5">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="!text-[22px] font-semibold text-[#313440]">Address book</h2>
                            <button
                                type="button"
                                onClick={() => {
                                    // router.push("/about");
                                    router.push(`/manage/customers/edit/${id}/add`);
                                }}
                                className="flex items-center gap-1.5 h-9 px-4 border border-[#4361ee] text-[#4361ee] text-[13px] rounded-sm hover:bg-[#eef3ff]"
                            >
                                <Plus size={14} />
                                Add address
                            </button>
                        </div>

                        {/* Count + Bulk Delete + Pagination */}
                        <div className="flex items-center justify-between text-[13px] text-[#555] mb-3">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={
                                            customerAddresses.length > 0 &&
                                            selectedIds.length === customerAddresses.length
                                        }
                                        onCheckedChange={toggleSelectAll}
                                    />
                                    <span>
                                        {selectedIds.length > 0
                                            ? `${selectedIds.length}/${customerAddresses.length} address`
                                            : `${customerAddresses.length} address`}
                                    </span>
                                </div>

                                {/* Bulk Delete Button - only show when selected */}
                                {selectedIds.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleBulkDelete}
                                        className="h-8 px-3 border border-[#4361ee] text-[#4361ee] text-[13px] rounded-sm hover:bg-[#eef3ff]"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <span>1 of 1</span>
                                <div className="flex items-center gap-1">
                                    <button type="button" className="text-gray-400 hover:text-gray-600">
                                        {/* <ChevronLeft size={16} /> */}
                                    </button>
                                    <button type="button" className="text-gray-400 hover:text-gray-600">
                                        {/* <ChevronRight size={16} /> */}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-[13px]">
                                <thead>
                                    <tr className="border-b border-gray-200 text-left text-[#666]">
                                        <th className="pb-3 font-medium w-10"></th>
                                        <th className="pb-3 font-medium">Name</th>
                                        <th className="pb-3 font-medium">Phone</th>
                                        <th className="pb-3 font-medium">Address</th>
                                        <th className="pb-3 font-medium">Type</th>
                                        <th className="pb-3 font-medium w-10"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {addressesLoading ? (
                                        <tr>
                                            <td colSpan={6} className="py-10 text-center text-gray-500">
                                                Loading addresses...
                                            </td>
                                        </tr>
                                    ) : customerAddresses?.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-10 text-center text-gray-500">
                                                No addresses found
                                            </td>
                                        </tr>
                                    ) : (
                                        customerAddresses.map((address: any) => (
                                            <tr
                                                key={address.id}
                                                className="border-b border-gray-100 hover:bg-[#fafafa]"
                                            >
                                                {/* Checkbox */}
                                                <td className="py-3">
                                                    <Checkbox
                                                        checked={selectedIds.includes(address.id)}
                                                        onCheckedChange={() => toggleSelect(address.id)}
                                                    />
                                                </td>

                                                {/* Name */}
                                                <td className="py-3">
                                                    <span className="text-[#4361ee] hover:underline cursor-pointer">
                                                        {address.first_name} {address.last_name}
                                                    </span>
                                                </td>

                                                {/* Phone */}
                                                <td className="py-3 text-[#222]">
                                                    {address.phone_number || "—"}
                                                </td>

                                                {/* Address */}
                                                <td className="py-3 text-[#222]">
                                                    <div>{address.address_line_1}</div>
                                                    {address.address_line_2 && (
                                                        <div className="text-gray-500 text-[12px]">
                                                            {address.address_line_2}
                                                        </div>
                                                    )}
                                                    <div className="text-gray-500 text-[12px]">
                                                        {[address.city, address.state, address.country]
                                                            .filter(Boolean)
                                                            .join(", ")}
                                                    </div>
                                                </td>

                                                {/* Type */}
                                                <td className="py-3 text-[#222]">
                                                    {address.address_type ? (
                                                        <span className="text-[#4361ee] font-medium">{address?.address_type}</span>
                                                    ) : (
                                                        "Residential"
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <button
                                                                type="button"
                                                                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                                                            >
                                                                <MoreHorizontal size={16} />
                                                            </button>
                                                        </DropdownMenuTrigger>

                                                        <DropdownMenuContent align="end" className="w-32">
                                                            <DropdownMenuItem
                                                                className="cursor-pointer text-[13px]"
                                                                onClick={() => {
                                                                    // router.push("/about");
                                                                    router.push(`/manage/customers/edit/${id}/${address.id}`);
                                                                }}
                                                            >
                                                                Edit
                                                            </DropdownMenuItem>

                                                            <DropdownMenuItem
                                                                className="cursor-pointer text-[13px] text-red-600 focus:text-red-600"
                                                                onClick={() => {
                                                                    // single delete using same API
                                                                    dispatch(
                                                                        customerAddressesDeleteMultiple({
                                                                            data: { ids: [address.id] },
                                                                        })
                                                                    ).then(() => {
                                                                        dispatch(fetchCustomerAddresses({ customerId: Number(id) }));
                                                                    });
                                                                }}
                                                            >
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* ==================== NOTES ==================== */}
                    <div className="bg-white border border-[#e5e7eb] rounded-md p-6 mb-8">
                        <h2 className="!text-[22px] font-semibold text-[#313440] mb-2">
                            Notes
                        </h2>
                        <p className="text-[15px] text-[#5E637A] mb-3">
                            Notes on this customer will only be visible to staff
                        </p>
                        <Textarea
                            value={formData.notes}
                            onChange={(e) => updateField("notes", e.target.value)}
                            placeholder="Enter your notes here"
                            rows={4}
                            className="resize-none h-56"
                        />
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="sticky bottom-0 w-full border-t p-4 bg-white flex justify-end gap-3">
                    <Link href="/manage/customers">
                        <button
                            type="button"
                            className="h-10 px-6 border border-gray-300 rounded-sm text-[14px] text-[#333] hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </Link>

                    {!isEdit && (
                        <button
                            disabled={loading}
                            type="button"
                            className="h-10 px-5 border border-[#4361ee] text-[#4361ee] rounded-sm text-[14px] hover:bg-[#eef3ff]"
                            onClick={() => {
                                setSaveAndAddAnother(true);
                                document
                                    .querySelector("form")
                                    ?.dispatchEvent(
                                        new Event("submit", { cancelable: true, bubbles: true })
                                    );
                            }}
                        >
                            {loading ? "Saving..." : "Save and add another"}
                        </button>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="h-10 px-8 bg-[#4361ee] text-white rounded-sm text-[14px] hover:bg-[#3651d4]"
                    >
                        {loading
                            ? "Saving..."
                            : isEdit
                                ? "Save"
                                : "Add Customer"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCustomer;