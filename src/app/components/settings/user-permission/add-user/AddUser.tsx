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
import { useRouter } from "next/navigation";
import { fetchPermissions, fetchMyPermissions } from "@/redux/slices/userPermission";
import { registerUser } from "@/redux/slices/authSlice";

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

const AddUser = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { permissionGroups, permissionsLoading } = useAppSelector(
        (state: any) => state?.userPermission
    );

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors }, // ← add this
    } = useForm<FormValues>({
        defaultValues: {
            userRole: 1,
            permissions: [],
        },
    });

    const selectedPermissions = watch("permissions") || [];

    useEffect(() => {
        dispatch(fetchPermissions());
        dispatch(fetchMyPermissions());
    }, []);

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...data,
                permissions: selectedPermissions.length ? selectedPermissions : [1],
            };
            const resultAction = await dispatch(registerUser(payload));

            if (registerUser.fulfilled.match(resultAction)) {
                console.log("Submitting:", payload);
                router.push("/manage/settings/user-permission");
            }

        } catch (err) {
            console.error("Error creating user:", err);
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
                <h1 className="!text-[34px] font-normal text-gray-800">Create a User Account</h1>
                <p className="!text-[14px] text-gray-500 mt-3">
                   A user is someone who has access to the administration area of your store. Each user account also has its own customizable access permissions, which you can setup below.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 px-6 pb-6">

                {/* ── Personal Information ── */}
                <div className="px-0 py-4">
                    <h2 className="text-base font-semibold text-gray-800">
                        Personal Information
                    </h2>
                </div>

              <div className="bg-white border border-[#e1e4e8] rounded-[3px]">
  <div className="px-8 py-7">
    {/* ================= FIRST NAME ================= */}
    <div className="flex items-start gap-4 mb-5">
      <Label
        htmlFor="firstName"
        className="
          w-[120px]
          shrink-0
          pt-[9px]
          text-right
          !text-[14px]
          leading-[20px]
          !font-normal
          text-[#374151]
        "
      >
        First Name:
        <span className="ml-1 text-red-500">*</span>
      </Label>

      <div className="flex flex-col">
        <Input
          id="firstName"
          placeholder="John"
          {...register("firstName", {
            required: "First name is required",
          })}
          className="
            w-[320px]
            h-[38px]
            rounded-[3px]
            border-[#c9cdd2]
            bg-white
            px-3
           !text-[14px]
           !font-normal
            text-[#2d3748]
            shadow-none
            placeholder:text-[#9ca3af]
            focus-visible:border-[#4d70ff]
            focus-visible:ring-1
            focus-visible:ring-[#4d70ff]
            focus-visible:ring-offset-0
          "
        />

        {errors.firstName && (
          <span className="mt-1.5 text-[12px] leading-[16px] text-red-500">
            {errors.firstName.message}
          </span>
        )}
      </div>
    </div>

    {/* ================= LAST NAME ================= */}
    <div className="flex items-start gap-4 mb-5">
      <Label
        htmlFor="lastName"
        className="
          w-[120px]
          shrink-0
          pt-[9px]
          text-right
         !text-[14px]
          leading-[20px]
          !font-normal
          text-[#374151]
        "
      >
        Last Name:
        <span className="ml-1 text-red-500">*</span>
      </Label>

      <div className="flex flex-col">
        <Input
          id="lastName"
          placeholder="Doe"
          {...register("lastName", {
            required: "Last name is required",
          })}
          className="
            w-[320px]
            h-[38px]
            rounded-[3px]
            border-[#c9cdd2]
            bg-white
            px-3
            !text-[14px]
            !font-normal
            text-[#2d3748]
            shadow-none
            placeholder:text-[#9ca3af]
            focus-visible:border-[#4d70ff]
            focus-visible:ring-1
            focus-visible:ring-[#4d70ff]
            focus-visible:ring-offset-0
          "
        />

        {errors.lastName && (
          <span className="mt-1.5 text-[12px] leading-[16px] text-red-500">
            {errors.lastName.message}
          </span>
        )}
      </div>
    </div>

    {/* ================= EMAIL ================= */}
    <div className="flex items-start gap-4 mb-5">
      <Label
        htmlFor="email"
        className="
          w-[120px]
          shrink-0
          pt-[9px]
          text-right
          !text-[14px]
          leading-[20px]
          !font-normal
          text-[#374151]
        "
      >
        Email:
        <span className="ml-1 text-red-500">*</span>
      </Label>

      <div className="flex flex-col">
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="
            w-[320px]
            h-[38px]
            rounded-[3px]
            border-[#c9cdd2]
            bg-white
            px-3
            text-[14px]
            text-[#2d3748]
            !font-normal
            shadow-none
            placeholder:text-[#9ca3af]
            focus-visible:border-[#4d70ff]
            focus-visible:ring-1
            focus-visible:ring-[#4d70ff]
            focus-visible:ring-offset-0
          "
        />

        {errors.email && (
          <span className="mt-1.5 text-[12px] leading-[16px] text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>
    </div>

    {/* ================= PHONE NUMBER ================= */}
    <div className="flex items-start gap-4 mb-5">
      <Label
        htmlFor="phoneNumber"
        className="
          w-[120px]
          shrink-0
          pt-[9px]
          text-right
          !text-[14px]
          leading-[20px]
          !font-normal
          text-[#374151]
        "
      >
        Phone Number:
        <span className="ml-1 text-red-500">*</span>
      </Label>

      <div className="flex flex-col">
        <Input
          id="phoneNumber"
          placeholder="+92 300 1234567"
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
          className="
            w-[320px]
            h-[38px]
            rounded-[3px]
            border-[#c9cdd2]
            bg-white
            px-3
            !text-[14px]
            !font-normal
            text-[#2d3748]
            shadow-none
            placeholder:text-[#9ca3af]
            focus-visible:border-[#4d70ff]
            focus-visible:ring-1
            focus-visible:ring-[#4d70ff]
            focus-visible:ring-offset-0
          "
        />

        {errors.phoneNumber && (
          <span className="mt-1.5 text-[12px] leading-[16px] text-red-500">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>
    </div>

    {/* ================= PASSWORD ================= */}
    {/*
    <div className="flex items-start gap-4 mb-5">
      <Label
        htmlFor="password"
        className="
          w-[120px]
          shrink-0
          pt-[9px]
          text-right
          text-[13px]
          leading-[20px]
          font-medium
          text-[#374151]
        "
      >
        Password:
        <span className="ml-1 text-red-500">*</span>
      </Label>

      <div className="flex flex-col">
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="
            w-[320px]
            h-[38px]
            rounded-[3px]
            border-[#c9cdd2]
            bg-white
            px-3
            text-[14px]
            text-[#2d3748]
            shadow-none
            placeholder:text-[#9ca3af]
            focus-visible:border-[#4d70ff]
            focus-visible:ring-1
            focus-visible:ring-[#4d70ff]
            focus-visible:ring-offset-0
          "
        />

        {errors.password && (
          <span className="mt-1.5 text-[12px] leading-[16px] text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
    </div>

    {/* ================= CONFIRM PASSWORD ================= */}
    {/*
    <div className="flex items-start gap-4 mb-5">
      <Label
        htmlFor="password_confirmation"
        className="
          w-[120px]
          shrink-0
          pt-[9px]
          text-right
          text-[13px]
          leading-[20px]
          font-medium
          text-[#374151]
        "
      >
        Confirm Password:
        <span className="ml-1 text-red-500">*</span>
      </Label>

      <div className="flex flex-col">
        <Input
          id="password_confirmation"
          type="password"
          {...register("password_confirmation", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") ||
              "Passwords do not match",
          })}
          className="
            w-[320px]
            h-[38px]
            rounded-[3px]
            border-[#c9cdd2]
            bg-white
            px-3
            text-[14px]
            text-[#2d3748]
            shadow-none
            placeholder:text-[#9ca3af]
            focus-visible:border-[#4d70ff]
            focus-visible:ring-1
            focus-visible:ring-[#4d70ff]
            focus-visible:ring-offset-0
          "
        />

        {errors.password_confirmation && (
          <span className="mt-1.5 text-[12px] leading-[16px] text-red-500">
            {errors.password_confirmation.message}
          </span>
        )}
      </div>
    </div>
    */}
  </div>
</div>
                {/* ── Permissions ── */}
                <div className="px-0 py-4 mt-4">
                    <h2 className="text-base font-semibold text-gray-800">
                        Permissions
                    </h2>
                </div>

                <div className="bg-white border border-[#e1e4e8] rounded-[3px] overflow-hidden">
    {/* ================= PERMISSIONS ================= */}
    <div className="px-8 py-7">
        <div className="space-y-5">
            {permissionGroups?.map((group: any) => (
                <div
                    key={group.group}
                    className="flex items-start gap-5"
                >
                    {/* Group Label */}
                    <Label
                        className="
                            w-[150px]
                            shrink-0
                            pt-[9px]
                            text-right
                            !text-[15px]
                            leading-[20px]
                            !font-normal
                            text-[#374151]
                            capitalize
                        "
                    >
                        {group.group}:
                    </Label>

                    {/* Permissions List */}
                    <div
                        className="
                            w-[420px]
                            max-h-[170px]
                            overflow-y-auto
                            border
                            border-[#c9cdd2]
                            rounded-[3px]
                            bg-white
                            shadow-[0_1px_2px_rgba(0,0,0,0.04)]
                             [&::-webkit-scrollbar]:w-[9px]
        [&::-webkit-scrollbar-track]:bg-[#eeeeee]
        [&::-webkit-scrollbar-thumb]:bg-[#aeb4bb]
        [&::-webkit-scrollbar-thumb]:rounded-[3px]
        [&::-webkit-scrollbar-thumb:hover]:bg-[#969da5]
                        "
                    >
                        {group.permissions?.map((permission: any) => (
                            <Controller
                                key={permission.id}
                                name="permissions"
                                control={control}
                                render={({ field }) => {
                                    const isChecked =
                                        field.value?.includes(permission.id);

                                    return (
                                        <label
                                            className={`
                                                flex
                                                items-center
                                                gap-3
                                                min-h-[42px]
                                                px-3
                                                cursor-pointer
                                                border-b
                                                border-[#f0f1f3]
                                                last:border-b-0
                                                transition-colors
                                                ${
                                                    isChecked
                                                        ? "bg-[#eef2ff]"
                                                        : "bg-white hover:bg-[#f8f9fb]"
                                                }
                                            `}
                                        >
                                            <Checkbox
                                                checked={isChecked}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        field.onChange([
                                                            ...(field.value || []),
                                                            permission.id,
                                                        ]);
                                                    } else {
                                                        field.onChange(
                                                            (field.value || []).filter(
                                                                (id) =>
                                                                    id !==
                                                                    permission.id
                                                            )
                                                        );
                                                    }
                                                }}
                                                className="
                                                    h-[16px]
                                                    w-[16px]
                                                    rounded-[3px]
                                                    data-[state=checked]:bg-[#4361ee]
                                                    data-[state=checked]:border-[#4361ee]
                                                "
                                            />

                                            <span
                                                className="
                                                    !text-[13px]
                                                    leading-[20px]
                                                    text-[#374151]
                                                    select-none
                                                "
                                            >
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

    {/* ================= FOOTER ================= */}
    <div
        className="
            flex
            justify-end
            items-center
            gap-3
            px-8
            py-4
            bg-[#fafbfc]
            border-t
            border-[#e1e4e8]
        "
    >
        <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="
                h-[36px]
                px-4
                rounded-[3px]
                bg-white
                border
                border-[#c9cdd2]
                text-[13px]
                font-medium
                text-[#374151]
                hover:bg-[#f5f6f8]
                hover:border-[#b8bdc4]
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-colors
            "
        >
            Cancel
        </button>

        <button
            type="submit"
            disabled={isSubmitting}
            className="
                h-[36px]
                min-w-[82px]
                px-5
                rounded-[3px]
                bg-[#4361ee]
                hover:bg-[#3653d4]
                text-white
                text-[13px]
                font-medium
                flex
                items-center
                justify-center
                gap-2
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-colors
            "
        >
            {isSubmitting ? (
                <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
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

export default AddUser;