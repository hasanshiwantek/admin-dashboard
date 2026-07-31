"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
    fetchCustomerAddressById,
    updateCustomerAddress,
} from "@/redux/slices/customerSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Country, State } from "country-state-city";

export default function UpdateAddress() {
    const router = useRouter();
    const params = useParams();

    // Adjust according to your route structure
    // Example route: /manage/customers/[customerId]/address/[addressId]/edit
    const customerId = params.customerId || params.id;
    const addressId = params.addressId; // ← make sure this exists in URL

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const countryList = Country.getAllCountries().map((c) => ({
        name: c.name,
        code: c.isoCode,
    }));

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        company_name: "",
        phone_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        type: "Residential",
        is_default: false,
    });

    const stateList = useMemo(() => {
        if (!form.country) return [];
        return State.getStatesOfCountry(form.country).map((s) => ({
            name: s.name,
            code: s.isoCode,
        }));
    }, [form.country]);

    // Fetch address data
    useEffect(() => {
        if (!addressId) return;

        setFetching(true);
        dispatch(fetchCustomerAddressById({ addressId: Number(addressId) }))
            .then((res: any) => {
                const data = res.payload?.data || res.payload;

                if (data) {
                    setForm({
                        first_name: data.first_name || data.firstName || "",
                        last_name: data.last_name || data.lastName || "",
                        company_name: data.company_name || data.companyName || "",
                        phone_number: data.phone_number || data.phoneNumber || "",
                        address_line_1: data.address_line_1 || data.addressLine1 || "",
                        address_line_2: data.address_line_2 || data.addressLine2 || "",
                        city: data.city || "",
                        state: data.state || "",
                        country: data.country || "",
                        zip: data.zip || data.postal_code || "",
                        type: data.type || "Residential",
                        is_default: data.is_default || false,
                    });
                }
            })
            .finally(() => setFetching(false));
    }, [addressId, dispatch]);

    const updateField = (field: string, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            customer_id: Number(customerId),
            first_name: form.first_name,
            last_name: form.last_name,
            company_name: form.company_name,
            phone_number: form.phone_number,
            address_line_1: form.address_line_1,
            address_line_2: form.address_line_2,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
            type: form.type,
            is_default: form.is_default,
        };

        setLoading(true);
        try {
            const result = await dispatch(
                updateCustomerAddress({ addressId: addressId as string, data: payload })
            );

            if (result.meta.requestStatus === "fulfilled") {
                router.back();
            } else {
                alert("Failed to update address");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center">
                <p className="text-gray-500">Loading address...</p>
            </div>
        );
    }

    return (
         <div className="ab flex flex-col bg-[#f6f7fb]">
         <form onSubmit={handleSubmit} className="flex min-h-[calc(100vh-64px)] flex-col">
               <div className="max-w-[940px] mx-auto w-full flex-1 px-6 py-10">
                    <h1 className="text-[30px] !font-light text-[#313440] mb-8">
                        Edit address
                    </h1>

                   <div className="bg-white border border-[#e5e7eb] rounded-md px-6 py-8">
                        {/* First Name + Last Name */}
                      <div className="grid grid-cols-2 gap-x-5 gap-y-6 w-full">
                            <div>
                                <Label className="text-[15px]   text-[#313440] font-semibold mb-2 block">
                                    First Name <span className="!text-red-500">*</span>
                                </Label>
                                <Input
                                    value={form.first_name}
                                    onChange={(e) => updateField("first_name", e.target.value)}
                                    required
                                    className="h-12 max-w-none rounded-sm "
                                />
                            </div>
                            <div>
                                <Label className="text-[15px] text-[#313440] mb-1.5 block">
                                    Last Name <span className="!text-red-500">*</span>
                                </Label>
                                <Input
                                    value={form.last_name}
                                    onChange={(e) => updateField("last_name", e.target.value)}
                                    required
                                    className="h-12 max-w-none w-full"
                                />
                            </div>
                        </div>

                        {/* Company + Phone */}
                        <div className="grid grid-cols-2 gap-6  !text-[#313440] mb-5 mt-2 !w-full">
                            <div>
                                <Label className="text-[15px] mb-1.5 block">
                                    Company Name
                                </Label>
                                <Input
                                    value={form.company_name}
                                    onChange={(e) => updateField("company_name", e.target.value)}
                                    className="h-12 max-w-none w-full"
                                />
                            </div>
                            <div>
                                <Label className="text-[15px] mb-1.5 block">
                                    Phone Number
                                </Label>
                                <Input
                                    value={form.phone_number}
                                    onChange={(e) => updateField("phone_number", e.target.value)}
                                    className="h-12 max-w-none w-full"
                                />
                            </div>
                        </div>

                        {/* Address Line 1 */}
                        <div className="mb-5">
                            <Label className="text-[15px] mb-1.5 block">
                                Address Line 1<span className="!text-red-500">*</span>
                            </Label>
                            <Input
                                value={form.address_line_1}
                                onChange={(e) => updateField("address_line_1", e.target.value)}
                                required
                                className="h-12 max-w-none w-full"
                            />
                        </div>

                        {/* Address Line 2 */}
                        <div className="mb-5  !text-[#313440]">
                            <Label className="text-[15px] mb-1.5 block">
                                Address Line 2
                            </Label>
                            <Input
                                value={form.address_line_2}
                                onChange={(e) => updateField("address_line_2", e.target.value)}
                                className="h-12 max-w-none w-full"
                            />
                        </div>

                        {/* City + State */}
                        <div className="grid grid-cols-2 gap-6 mb-5">
                            <div>
                                <Label className="text-[15px] mb-1.5 block">
                                    City <span className="!text-red-500">*</span>
                                </Label>
                                <Input
                                    value={form.city}
                                    onChange={(e) => updateField("city", e.target.value)}
                                    required
                                    className="h-12 max-w-none w-full"
                                />
                            </div>
                            <div>
                                <Label className="text-[15px]  text-[#313440] mb-1.5 block">
                                    State
                                </Label>
                                <Select
                                    value={form.state}
                                    onValueChange={(val) => updateField("state", val)}
                                    disabled={!form.country}
                                >
                                    <SelectTrigger className="h-12 max-w-none w-full">
                                        <SelectValue placeholder="Choose state" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-72 overflow-y-auto">
                                        {stateList?.map((c: any, i: number) => (
                                            <SelectItem key={i} value={c.code}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Country + Zip */}
                        <div className="grid grid-cols-2 gap-6 mb-6 !w-full">
                            <div>
                                <Label className="text-[15px] mb-1.5 block">
                                    Country <span className="!text-red-500">*</span>
                                </Label>
                                <Select
                                    value={form.country}
                                    onValueChange={(val) => {
                                        updateField("country", val);
                                        updateField("state", ""); // clear state when country changes
                                    }}
                                >
                                    <SelectTrigger className="h-12  max-w-none w-full">
                                        <SelectValue placeholder="Choose country" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-72 overflow-y-auto">
                                        {countryList?.map((c: any, i: number) => (
                                            <SelectItem key={i} value={c.code}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-[15px]  text-[#313440] mb-1.5 block">
                                    Code postal
                                </Label>
                                <Input
                                    value={form.zip}
                                    onChange={(e) => updateField("zip", e.target.value)}
                                    className="h-12 max-w-none w-full"
                                />
                            </div>
                        </div>

                        {/* Type */}
                        <div>
                            <Label className="text-[15px]  text-[#313440] mb-3 block">Type</Label>
                            <RadioGroup
                                value={form.type}
                                onValueChange={(val) => updateField("type", val)}
                                className="flex flex-col gap-2"
                            >
                                <div className="flex items-center   text-[#313440] gap-2">
                                    <RadioGroupItem value="Residential" id="residential" />
                                    <Label htmlFor="residential" className="text-[15px] cursor-pointer">
                                        Residential
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="Commercial" id="commercial" />
                                    <Label htmlFor="commercial" className="text-[13px] cursor-pointer">
                                        Commercial
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                {/* Footer */}
              

                
          <div className="sticky bottom-0 w-full border-t bg-white px-6 py-4 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="h-10 px-5 text-[14px] text-[#4361ee] hover:underline"
                    >
                        Cancel
                    </button>

               

                    <button
                        type="submit"
                        disabled={loading}
                        className="h-10 px-8 bg-[#4361ee] text-white rounded-sm text-[14px] hover:bg-[#3651d4]"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}