"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { Checkbox } from "@/components/ui/checkbox"; // assuming you have this

interface Props {
    open: boolean;
    onClose: () => void;
}

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

export default function AddUserModal({ open, onClose }: Props) {
    const { permissionGroups } = useAppSelector((state) => state?.userPermission);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
    } = useForm<FormValues>({
        defaultValues: {
            userRole: 1,
            permissions: [],
        },
    });

    const selectedPermissions = watch("permissions") || [];

    const onSubmit = (data: FormValues) => {
        const payload = {
            ...data,
            permissions: selectedPermissions.length ? selectedPermissions : [1],
        };

        console.log("Submitting:", payload);
        // dispatch(createAdminUser(payload));
        // onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[780px] max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-xl">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-2xl">Add New User</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
                    {/* Personal Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="John" {...register("firstName")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Doe" {...register("lastName")} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input id="phoneNumber" placeholder="+92 300 1234567" {...register("phoneNumber")} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" {...register("password")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input id="password_confirmation" type="password" {...register("password_confirmation")} />
                            </div>
                        </div>
                    </div>

                    {/* Business Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input id="companyName" {...register("companyName")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="storeName">Store Name</Label>
                                <Input id="storeName" {...register("storeName")} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="businessSize">Business Size</Label>
                                <Select onValueChange={(v) => setValue("businessSize", v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select business size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="small">Small (1-10)</SelectItem>
                                        <SelectItem value="medium">Medium (11-50)</SelectItem>
                                        <SelectItem value="large">Large (51+)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="region">Region</Label>
                                <Input id="region" {...register("region")} />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="base_url">Base URL</Label>
                                <Input id="base_url" placeholder="https://example.com" {...register("base_url")} />
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-2">
                                <Label>Address Line 1</Label>
                                <Input {...register("addressLine1")} />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label>Address Line 2 (Optional)</Label>
                                <Input {...register("addressLine2")} />
                            </div>

                            <div className="space-y-2">
                                <Label>Suburb</Label>
                                <Input {...register("suburb")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Country</Label>
                                <Input {...register("country")} />
                            </div>

                            <div className="space-y-2">
                                <Label>State / Province</Label>
                                <Input {...register("state")} />
                            </div>
                            <div className="space-y-2">
                                <Label>ZIP / Postal Code</Label>
                                <Input {...register("zip")} />
                            </div>
                        </div>
                    </div>

                    {/* Permissions */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Permissions</h3>
                        <div className="space-y-6">
                            {permissionGroups.map((group) => (
                                <div key={group.group} className="border rounded-xl p-5 bg-muted/30">
                                    <h4 className="font-semibold text-lg capitalize mb-4">
                                        {group.group}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {group.permissions.map((permission) => (
                                            <Controller
                                                key={permission.id}
                                                name="permissions"
                                                control={control}
                                                render={({ field }) => (
                                                    <label className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded-lg transition">
                                                        <Checkbox
                                                            checked={field.value?.includes(permission.id)}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    field.onChange([...(field.value || []), permission.id]);
                                                                } else {
                                                                    field.onChange(
                                                                        (field.value || []).filter((id) => id !== permission.id)
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <span className="text-sm">{permission.label}</span>
                                                    </label>
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" size="lg">
                            Create User
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}