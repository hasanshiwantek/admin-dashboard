"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useRouter, useParams } from "next/navigation";
import {
    fetchPermissions,
    fetchMyPermissions,
    fetchUserPermissions,
    updateAdminUser,
    fetchAdminUsers,
} from "@/redux/slices/userPermission";

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    password_confirmation: string;
    companyName: string;
    storeName: string;
    addressLine1: string;
    addressLine2: string;
    suburb: string;
    country: string;
    state: string;
    zip: string;
    base_url: string;
    businessSize: string;
    region: string;
    userRole: number;
    permissions: number[];
};

const EditUser = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const params = useParams();
    const userId = params?.userId as string;

    const { permissionGroups, permissionsLoading, userPermissions, adminUsers } =
        useAppSelector((state: any) => state?.userPermission);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            userRole: 1,
            permissions: [],
        },
    });

    const selectedPermissions = watch("permissions") || [];

    useEffect(() => {
        dispatch(fetchAdminUsers());
        dispatch(fetchPermissions());
        dispatch(fetchMyPermissions());
    }, []);

    useEffect(() => {
        if (!userId) return;
        dispatch(fetchUserPermissions({ userId: Number(userId) }));
    }, [userId]);

    // Prefill user's existing permissions
    useEffect(() => {
        if (!Array.isArray(userPermissions)) return;

        const ids = userPermissions.flatMap((group: any) =>
            (group?.permissions || []).map((p: any) => p?.id)
        );

        setValue("permissions", ids.filter(Boolean));
    }, [userPermissions]);

    // Prefill user's basic details from the list (if available)
    useEffect(() => {
        if (!userId || !adminUsers?.length) return;
        const user = adminUsers.find((u: any) => String(u.id) === String(userId));
        if (!user) return;

        const [firstName = "", ...rest] = (user.name || "").split(" ");
        reset((prev) => ({
            ...prev,
            firstName,
            lastName: rest.join(" "),
            email: user.email || "",
            phoneNumber: user.phone || "",
            storeName: user.storeName || "",
            businessSize: user.businessSize || "",
            region: user.region || "",
            userRole: user.userRole ?? 1,
        }));
    }, [userId, adminUsers]);

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            const payload = {
                id: Number(userId),
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                permissions: selectedPermissions.length ? selectedPermissions : [1],
            };

            const resultAction = await dispatch(updateAdminUser(payload));

            if (updateAdminUser.fulfilled.match(resultAction)) {
                router.push("/manage/settings/user-permission");
            }
        } catch (err) {
            console.error("Error updating user:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (permissionsLoading && !permissionGroups?.length) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col">

            {/* ── Page Header (outside white box) ── */}
            <div className="px-6 pt-6 pb-3">
                <h1 className="text-2xl font-normal text-gray-800">Edit User</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Update the details of the user below. Assign the permissions this user should have access to, then click 'Save'.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 px-6 pb-6">

                {/* ── Personal Information ── */}
                <div className="px-0 py-4">
                    <h2 className="text-base font-semibold text-gray-800">
                        Personal Information
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-sm">
                    <div className="px-8 py-6">

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="firstName"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                First Name:
                            </Label>
                            <Input
                                id="firstName"
                                placeholder="John"
                                {...register("firstName")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="lastName"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Last Name:
                            </Label>
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                {...register("lastName")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="email"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Email:
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                {...register("email")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="phoneNumber"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Phone Number:
                            </Label>
                            <Input
                                id="phoneNumber"
                                placeholder="+92 300 1234567"
                                {...register("phoneNumber")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="password"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Password:
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="password_confirmation"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Confirm Password:
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                {...register("password_confirmation")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>
                    </div>
                </div>

                {/* ── Business Information ── */}
                {/* <div className="px-0 py-4 mt-4">
                    <h2 className="text-base font-semibold text-gray-800">
                        Business Information
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-sm">
                    <div className="px-8 py-6">

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="companyName"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Company Name:
                            </Label>
                            <Input
                                id="companyName"
                                {...register("companyName")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="storeName"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Store Name:
                            </Label>
                            <Input
                                id="storeName"
                                {...register("storeName")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="businessSize"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Business Size:
                            </Label>
                            <div className="w-[280px]">
                                <Select
                                    value={watch("businessSize")}
                                    onValueChange={(v) => setValue("businessSize", v)}
                                >
                                    <SelectTrigger className="h-8 text-sm border-gray-300">
                                        <SelectValue placeholder="Select business size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Small">Small (1-10)</SelectItem>
                                        <SelectItem value="Medium">Medium (11-50)</SelectItem>
                                        <SelectItem value="Large">Large (51+)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="region"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Region:
                            </Label>
                            <Input
                                id="region"
                                {...register("region")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="base_url"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Base URL:
                            </Label>
                            <Input
                                id="base_url"
                                placeholder="https://example.com"
                                {...register("base_url")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>
                    </div>
                </div> */}

                {/* ── Address ── */}
                {/* <div className="px-0 py-4 mt-4">
                    <h2 className="text-base font-semibold text-gray-800">
                        Address
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-sm">
                    <div className="px-8 py-6">

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="addressLine1"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Address Line 1:
                            </Label>
                            <Input
                                id="addressLine1"
                                {...register("addressLine1")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="addressLine2"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Address Line 2:
                            </Label>
                            <Input
                                id="addressLine2"
                                {...register("addressLine2")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="suburb"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Suburb:
                            </Label>
                            <Input
                                id="suburb"
                                {...register("suburb")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="country"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                Country:
                            </Label>
                            <Input
                                id="country"
                                {...register("country")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="state"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                State / Province:
                            </Label>
                            <Input
                                id="state"
                                {...register("state")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <Label
                                htmlFor="zip"
                                className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                            >
                                ZIP / Postal Code:
                            </Label>
                            <Input
                                id="zip"
                                {...register("zip")}
                                className="w-[280px] h-8 text-sm border-gray-300"
                            />
                        </div>
                    </div>
                </div> */}

                {/* ── Permissions ── */}
                <div className="px-0 py-4 mt-4">
                    <h2 className="text-base font-semibold text-gray-800">
                        Permissions
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-sm">
                    <div className="px-8 py-6">
                        <div className="space-y-6">
                            {permissionGroups?.map((group: any) => (
                                <div key={group.group} className="flex items-start gap-3">
                                    <Label className="text-[12px] text-gray-600 text-right w-[150px] shrink-0 pt-2 capitalize">
                                        {group.group}:
                                    </Label>

                                    <div className="w-[420px] max-h-[160px] overflow-y-auto border border-gray-300 rounded-sm bg-white">
                                        {group.permissions?.map((permission: any) => (
                                            <Controller
                                                key={permission.id}
                                                name="permissions"
                                                control={control}
                                                render={({ field }) => {
                                                    const isChecked = field.value?.includes(permission.id);
                                                    return (
                                                        <label
                                                            className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition ${isChecked
                                                                ? "bg-[#eef2ff]"
                                                                : "hover:bg-gray-50"
                                                                }`}
                                                        >
                                                            <Checkbox
                                                                checked={isChecked}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        field.onChange([...(field.value || []), permission.id]);
                                                                    } else {
                                                                        field.onChange(
                                                                            (field.value || []).filter((id) => id !== permission.id)
                                                                        );
                                                                    }
                                                                }}
                                                                className="data-[state=checked]:bg-[#4361ee] data-[state=checked]:border-[#4361ee]"
                                                            />
                                                            <span className="text-[13px] text-gray-700">
                                                                {permission.label}
                                                            </span>
                                                        </label>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Footer inside card, right-aligned ── */}
                    <div className="flex justify-end gap-3 px-6 py-4 border-gray-200">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                            className="text-sm text-blue-600 hover:underline px-3 py-1 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-1.5 rounded-sm flex items-center gap-2 disabled:opacity-50 transition"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save"
                            )}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default EditUser;