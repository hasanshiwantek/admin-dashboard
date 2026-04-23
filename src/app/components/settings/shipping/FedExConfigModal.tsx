"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
    disconnectFedex,
    fetchFedexConfig,
    fetchQuoteFedexConfig,
    saveFedexConfig,
    saveQuoteFedexConfig,
} from "@/redux/slices/shippingSlice";
import { countriesList, statesList } from "@/const/location";

// ─── Types ────────────────────────────────────────────────────
interface FedExConfigModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    methodId?: number | any;
}

interface FedExFormValues {
    // Settings
    displayName: string;
    dropOffType: string;
    packagingType: string;
    packingMethod: string;
    rateType: string;
    includePackageValue: boolean;
    destinationType: string;
    deliveryServices: string[];
    // Connection
    key: string;
    password: string;
    accountNumber: string;
    apiBaseUrl: string;
    // Quote
    destCountry: string;
    destState: string;
    destZip: string;
    pkgWeight: string;
    pkgValue: string;
    pkgLength: string;
    pkgWidth: string;
    pkgHeight: string;
}

// ─── Default values ───────────────────────────────────────────
const defaultValues: FedExFormValues = {
    displayName: "",
    dropOffType: "",
    packagingType: "",
    packingMethod: "",
    rateType: "",
    includePackageValue: false,
    destinationType: "",
    deliveryServices: [],
    key: "",
    password: "",
    accountNumber: "",
    apiBaseUrl: "",
    destCountry: "",
    destState: "",
    destZip: "",
    pkgWeight: "",
    pkgValue: "",
    pkgLength: "",
    pkgWidth: "",
    pkgHeight: "",
};

// ─── Tab config ───────────────────────────────────────────────
const tabs = [
    { id: "settings", label: "Settings" },
    { id: "connection", label: "Connection" },
    { id: "quote", label: "Quote" },
];

// ─── Small reusable error message ─────────────────────────────
function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-xs text-red-500 mt-1">{message}</p>;
}

// ─── Component ────────────────────────────────────────────────
export default function FedExConfigModal({
    open,
    onOpenChange,
    methodId,
}: FedExConfigModalProps) {
    const dispatch = useAppDispatch();

    const { fedexConfig, saveConfigLoader, quoteFedexConfig, fedexServices } =
        useAppSelector((state) => state.shippingZone);

    const methods = useForm<FedExFormValues>({
        defaultValues,
        mode: "onSubmit",
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = methods;

    const activeTab = watch("_activeTab" as any) || "settings";
    const deliveryServices = watch("deliveryServices");
    const includePackageValue = watch("includePackageValue");

    // ── helpers to set active tab (stored as a hidden field trick)
    const setActiveTab = (tab: string) =>
        setValue("_activeTab" as any, tab as any);

    // ── Toggle delivery service checkbox
    const toggleService = (svcKey: string) => {
        const current = deliveryServices ?? [];
        setValue(
            "deliveryServices",
            current.includes(svcKey)
                ? current.filter((s) => s !== svcKey)
                : [...current, svcKey],
            { shouldValidate: true }
        );
    };

    // ── Reset form when modal closes
    useEffect(() => {
        if (!open) reset(defaultValues);
    }, [open, reset]);

    // ── Populate form when Redux data arrives
    useEffect(() => {
        if (fedexConfig) {
            reset((prev) => ({
                ...prev,
                displayName: fedexConfig.display_name || "",
                dropOffType: fedexConfig.dropoff_type || "",
                packagingType: fedexConfig.packaging_type || "",
                packingMethod: fedexConfig.packing_method || "",
                rateType: fedexConfig.rate_type || "",
                includePackageValue: fedexConfig.include_package_value ?? true,
                destinationType: fedexConfig.destination_type || "",
                deliveryServices: fedexConfig.enabled_services || [],
                key: fedexConfig.client_id || "",
                password: fedexConfig.client_secret || "",
                accountNumber: fedexConfig.account_number || "",
                apiBaseUrl: fedexConfig.api_base_url || "",
            }));
        }

        if (quoteFedexConfig) {
            reset((prev) => ({
                ...prev,
                destCountry: quoteFedexConfig.destination_country || "",
                destState: quoteFedexConfig.destination_state || "",
                destZip: quoteFedexConfig.destination_zip || "",
                pkgWeight: String(quoteFedexConfig.package_weight ?? ""),
                pkgValue: String(quoteFedexConfig.package_value ?? ""),
                pkgLength: String(quoteFedexConfig.package_length ?? ""),
                pkgWidth: String(quoteFedexConfig.package_width ?? ""),
                pkgHeight: String(quoteFedexConfig.package_height ?? ""),
            }));
        }
    }, [fedexConfig, quoteFedexConfig, reset]);

    // ── Fetch on open
    useEffect(() => {
        if (methodId) {
            dispatch(fetchFedexConfig({ method_id: Number(methodId) }));
            dispatch(fetchQuoteFedexConfig({ method_id: Number(methodId) }));
        }
    }, [methodId, dispatch]);

    // ── Form submit
    const onSubmit = (data: FedExFormValues) => {
        if (activeTab === "quote") {
            const payload = {
                method_id: Number(methodId),
                data: {
                    destination_country: data.destCountry,
                    destination_state: data.destState,
                    destination_zip: data.destZip,
                    package_weight: Number(data.pkgWeight),
                    package_value: Number(data.pkgValue),
                    package_length: Number(data.pkgLength),
                    package_width: Number(data.pkgWidth),
                    package_height: Number(data.pkgHeight),
                },
            };
            dispatch(saveQuoteFedexConfig(payload)).then((result) => {
                if (saveQuoteFedexConfig.fulfilled.match(result)) {
                    onOpenChange(false);
                    if (methodId)
                        dispatch(fetchQuoteFedexConfig({ method_id: Number(methodId) }));
                }
            });
        } else {
            dispatch(
                saveFedexConfig({
                    method_id: Number(methodId),
                    data: {
                        display_name: data.displayName,
                        dropoff_type: data.dropOffType,
                        packaging_type: data.packagingType,
                        packing_method: data.packingMethod,
                        rate_type: data.rateType,
                        include_package_value: data.includePackageValue,
                        destination_type: data.destinationType,
                        enabled_services: data.deliveryServices,
                        client_id: data.key,
                        client_secret: data.password || "",
                        account_number: data.accountNumber,
                        api_base_url: data.apiBaseUrl,
                    },
                })
            ).then((result) => {
                if (saveFedexConfig.fulfilled.match(result)) {
                    onOpenChange(false);
                    if (methodId)
                        dispatch(fetchFedexConfig({ method_id: Number(methodId) }));
                }
            });
        }
    };

    // ── Validation rules per tab
    const settingsRules = {
        displayName: { required: "Display name is required" },
        dropOffType: { required: "Drop-off type is required" },
        packagingType: { required: "Packaging type is required" },
        packingMethod: { required: "Packing method is required" },
        rateType: { required: "Rate type is required" },
        destinationType: { required: "Destination type is required" },
    };

    const connectionRules = {
        key: { required: "Key is required" },
        accountNumber: { required: "Account number is required" },
        apiBaseUrl: { required: "API base URL is required" },
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col p-0">

                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-xl font-semibold">
                        Configure FedEx in United States
                    </DialogTitle>
                </DialogHeader>

                {/* Tabs */}
                <div className="border-b bg-white px-6">
                    <div className="flex gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 text-[15px] font-medium border-b-2 transition-all ${activeTab === tab.id
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form wraps everything so Submit button triggers validation */}
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col flex-1 overflow-hidden"
                    >
                        {/* Scrollable content */}
                        <div className="flex-1 overflow-y-auto p-6">

                            {/* ── SETTINGS TAB ── */}
                            {activeTab === "settings" && (
                                <div className="space-y-6">

                                    <div className="space-y-2">
                                        <Label>Display Name</Label>
                                        <Input
                                            {...register("displayName", settingsRules.displayName)}
                                            className="max-w-full"
                                        />
                                        <FieldError message={errors.displayName?.message} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Drop-off Type</Label>
                                        <Select
                                            value={watch("dropOffType")}
                                            onValueChange={(v) =>
                                                setValue("dropOffType", v, { shouldValidate: true })
                                            }
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="REGULAR_PICKUP">Regular Pickup</SelectItem>
                                                <SelectItem value="REQUEST_COURIER">Request Courier</SelectItem>
                                                <SelectItem value="DROP_BOX">Drop Box</SelectItem>
                                                <SelectItem value="BUSINESS_SERVICE_CENTER">Business Service Center</SelectItem>
                                                <SelectItem value="STATION">Station</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FieldError message={errors.dropOffType?.message} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Packaging Type</Label>
                                        <Select
                                            value={watch("packagingType")}
                                            onValueChange={(v) =>
                                                setValue("packagingType", v, { shouldValidate: true })
                                            }
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="FEDEX_ENVELOPE">FedEx Envelope</SelectItem>
                                                <SelectItem value="FEDEX_PAK">FedEx Pak</SelectItem>
                                                <SelectItem value="FEDEX_BOX">FedEx Box</SelectItem>
                                                <SelectItem value="FEDEX_TUBE">FedEx Tube</SelectItem>
                                                <SelectItem value="FEDEX_10KG_BOX">FedEx 10kg Box</SelectItem>
                                                <SelectItem value="FEDEX_25KG_BOX">FedEx 25kg Box</SelectItem>
                                                <SelectItem value="YOUR_PACKAGING">Your Packaging</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FieldError message={errors.packagingType?.message} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Packing Method</Label>
                                        <Select
                                            value={watch("packingMethod")}
                                            onValueChange={(v) =>
                                                setValue("packingMethod", v, { shouldValidate: true })
                                            }
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ALL_IN_ONE">All items in a single package</SelectItem>
                                                <SelectItem value="EACH_ITEM">Each item in its own package</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FieldError message={errors.packingMethod?.message} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Rate Type</Label>
                                        <Select
                                            value={watch("rateType")}
                                            onValueChange={(v) =>
                                                setValue("rateType", v, { shouldValidate: true })
                                            }
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="LIST">List Rate</SelectItem>
                                                <SelectItem value="ACCOUNT">Account Rate</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FieldError message={errors.rateType?.message} />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            checked={includePackageValue}
                                            onCheckedChange={(checked) =>
                                                setValue("includePackageValue", !!checked)
                                            }
                                        />
                                        <Label>Include Package Value</Label>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Destination Type</Label>
                                        <Select
                                            value={watch("destinationType")}
                                            onValueChange={(v) =>
                                                setValue("destinationType", v, { shouldValidate: true })
                                            }
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                                                <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FieldError message={errors.destinationType?.message} />
                                    </div>

                                    {/* Delivery Services */}
                                    <div className="space-y-4 pt-4">
                                        <Label>Delivery services</Label>
                                        <div className="text-sm text-gray-500 mb-3">
                                            <button
                                                type="button"
                                                className="underline mr-2"
                                                onClick={() =>
                                                    setValue(
                                                        "deliveryServices",
                                                        Object.keys(fedexServices),
                                                        { shouldValidate: true }
                                                    )
                                                }
                                            >
                                                Select All
                                            </button>
                                            |
                                            <button
                                                type="button"
                                                className="underline ml-2"
                                                onClick={() =>
                                                    setValue("deliveryServices", [], { shouldValidate: true })
                                                }
                                            >
                                                None
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3">
                                            {Object.entries(fedexServices).map(([svcKey, label]) => (
                                                <div key={svcKey} className="flex items-center gap-3">
                                                    <Checkbox
                                                        checked={deliveryServices?.includes(svcKey)}
                                                        onCheckedChange={() => toggleService(svcKey)}
                                                    />
                                                    <span className="text-sm">{label as string}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <FieldError message={errors.deliveryServices?.message} />
                                    </div>
                                </div>
                            )}

                            {/* ── CONNECTION TAB ── */}
                            {activeTab === "connection" && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Key</Label>
                                        <Input {...register("key", connectionRules.key)} />
                                        <FieldError message={errors.key?.message} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Password</Label>
                                        <Input
                                            type="password"
                                            {...register("password")}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Account Number</Label>
                                        <Input
                                            {...register("accountNumber", connectionRules.accountNumber)}
                                        />
                                        <FieldError message={errors.accountNumber?.message} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>API Base URL</Label>
                                        <Input
                                            {...register("apiBaseUrl", connectionRules.apiBaseUrl)}
                                        />
                                        <FieldError message={errors.apiBaseUrl?.message} />
                                    </div>

                                    {fedexConfig?.is_connected && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="text-red-500 border-red-300 hover:bg-red-50"
                                            onClick={() =>
                                                dispatch(
                                                    disconnectFedex({ method_id: Number(methodId) })
                                                ).then(() => {
                                                    dispatch(
                                                        fetchFedexConfig({ method_id: Number(methodId) })
                                                    );
                                                })
                                            }
                                        >
                                            Disconnect
                                        </Button>
                                    )}
                                </div>
                            )}

                            {/* ── QUOTE TAB ── */}
                            {activeTab === "quote" && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Destination country</Label>
                                        <Select
                                            value={watch("destCountry")}
                                            onValueChange={(v) => setValue("destCountry", v)}
                                        >
                                            <SelectTrigger className="max-w-full"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {countriesList.map((item, i) => (
                                                    <SelectItem key={i} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Destination state</Label>
                                        <Select
                                            value={watch("destState")}
                                            onValueChange={(v) => setValue("destState", v)}
                                        >
                                            <SelectTrigger className="max-w-full"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {statesList.map((item, i) => (
                                                    <SelectItem key={i} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Destination Zip/Postcode</Label>
                                        <Input className="max-w-full" {...register("destZip")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Package weight</Label>
                                        <Input className="max-w-full" type="number" {...register("pkgWeight")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Package value</Label>
                                        <div className="flex items-center border rounded-md overflow-hidden">
                                            <span className="px-3 py-2 bg-gray-100 text-gray-500 border-r text-sm">$</span>
                                            <Input
                                                type="number"
                                                {...register("pkgValue")}
                                                className="border-0 max-w-full rounded-none focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Package length</Label>
                                        <div className="flex items-center border rounded-md overflow-hidden">
                                            <Input
                                                type="number"
                                                {...register("pkgLength")}
                                                className="border-0 rounded-none focus-visible:ring-0 max-w-full"
                                            />
                                            <span className="px-3 py-2 bg-gray-100 text-gray-500 border-l text-sm">Inches</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Package width</Label>
                                        <div className="flex items-center border rounded-md overflow-hidden">
                                            <Input
                                                type="number"
                                                {...register("pkgWidth")}
                                                className="border-0 rounded-none focus-visible:ring-0  max-w-full"
                                            />
                                            <span className="px-3 py-2 bg-gray-100 text-gray-500 border-l text-sm">Inches</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Package height</Label>
                                        <div className="flex items-center border rounded-md overflow-hidden">
                                            <Input
                                                type="number"
                                                {...register("pkgHeight")}
                                                className="border-0 rounded-none focus-visible:ring-0  max-w-full"
                                            />
                                            <span className="px-3 py-2 bg-gray-100 text-gray-500 border-l text-sm">Inches</span>
                                        </div>
                                    </div>

                                    <Button type="button" variant="outline">Get quote</Button>
                                </div>
                            )}
                        </div>

                        {/* Sticky Footer */}
                        <div className="sticky bottom-0 border-t bg-gray-50 px-6 py-4 flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={saveConfigLoader}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {saveConfigLoader ? "Saving..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
