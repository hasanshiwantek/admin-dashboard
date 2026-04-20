"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FormProvider, useForm } from "react-hook-form";
import { countriesList, statesList } from "@/const/location";
interface ShippingAddressForm {
    address_line1: string;
    address_line2?: string;
    city: string;
    postal_code: string;
    country: string;
    state: string;
    phone_number?: string;
}

interface ConfigureShippingAddressProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ConfigureShippingAddress({ open, onOpenChange }: ConfigureShippingAddressProps) {

    const methods = useForm<ShippingAddressForm>({
        defaultValues: {
            address_line1: "",
            address_line2: "",
            city: "",
            postal_code: "",
            country: "",
            state: "",
            phone_number: "",
        }
    });

    const { register, handleSubmit, setValue, watch, formState: { errors } } = methods;

    const onSubmit = (data: ShippingAddressForm) => {
        console.log(data);
        // dispatch here
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col p-0">

                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
                    <DialogTitle className="text-xl font-semibold">
                        Configure shipping address
                    </DialogTitle>
                </DialogHeader>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 no-scrollbar">

                            {/* Address Line 1 */}
                            <div className="space-y-1.5">
                                <Label className=" text-gray-700">Address line 1</Label>
                                <Input
                                    {...register("address_line1", { required: "Address line 1 is required" })}
                                    className={errors.address_line1 ? "border-red-500 max-w-full" : "max-w-full"}
                                />
                                {errors.address_line1 && <p className="text-xs text-red-500">{errors.address_line1.message}</p>}
                            </div>

                            {/* Address Line 2 */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label className=" text-gray-700">Address line 2</Label>
                                    <span className="text-xs text-gray-400">(optional)</span>
                                </div>
                                <Input className="max-w-full" {...register("address_line2")} />
                            </div>

                            {/* City */}
                            <div className="space-y-1.5">
                                <Label className=" text-gray-700">City</Label>
                                <Input
                                    {...register("city", { required: "City is required" })}
                                    className={errors.city ? "border-red-500 max-w-full" : " max-w-full"}
                                />
                                {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                            </div>

                            {/* Postal Code */}
                            <div className="space-y-1.5">
                                <Label className=" text-gray-700">Postal code</Label>
                                <Input
                                    {...register("postal_code", { required: "Postal code is required" })}
                                    className={errors.postal_code ? "border-red-500 max-w-full" : "max-w-full"}
                                />
                                {errors.postal_code && <p className="text-xs text-red-500">{errors.postal_code.message}</p>}
                            </div>

                            {/* Country */}
                            <div className="space-y-1.5">
                                <Label className=" text-gray-700">Country</Label>
                                <Select
                                    value={watch("country")}
                                    onValueChange={(v) => setValue("country", v, { shouldValidate: true })}
                                >
                                    <SelectTrigger className={errors.country ? "border-red-500 max-w-full" : "max-w-full"}>
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countriesList.map((item) => {
                                            return <SelectItem value={item.value}>{item.label}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                                {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
                            </div>

                            {/* State */}
                            <div className="space-y-1.5">
                                <Label className=" text-gray-700">State</Label>
                                <Select
                                    value={watch("state")}
                                    onValueChange={(v) => setValue("state", v, { shouldValidate: true })}
                                >
                                    <SelectTrigger className={errors.state ? "border-red-500 max-w-full " : "max-w-full"}>
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       
                                        {statesList.map((item) => {
                                            return <SelectItem value={item.value}>{item.label}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                                {errors.state && <p className="text-xs text-red-500">{errors.state.message}</p>}
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label className=" text-gray-700">Phone number</Label>
                                    <span className="text-xs text-gray-400">(optional)</span>
                                </div>
                                <Input className="max-w-full" type="tel" {...register("phone_number")} />
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="border-t bg-white px-6 py-4 flex justify-end gap-3 flex-shrink-0">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                Submit
                            </Button>
                        </div>
                    </form>
                </FormProvider>

            </DialogContent>
        </Dialog>
    );
}