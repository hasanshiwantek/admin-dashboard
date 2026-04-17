"use client";

import { useEffect, useState } from "react";
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
import { disconnectFedex, fetchFedexConfig, fetchFedexServices, saveFedexConfig } from "@/redux/slices/shippingSlice";

interface FedExConfigModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    methodId?: number
}

const tabs = [
    { id: "settings", label: "Settings" },
    { id: "connection", label: "Connection" },
    { id: "quote", label: "Quote" },
];

export default function FedExConfigModal({ open, onOpenChange, methodId }: FedExConfigModalProps) {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState("settings");
    const [errors, setErrors] = useState<Record<string, string>>({});


    const [displayName, setDisplayName] = useState("");
    const [dropOffType, setDropOffType] = useState("");
    const [packagingType, setPackagingType] = useState("");
    const [packingMethod, setPackingMethod] = useState("");
    const [rateType, setRateType] = useState("");
    const [includePackageValue, setIncludePackageValue] = useState(false);
    const [destinationType, setDestinationType] = useState("");
    // Connection
    const [key, setKey] = useState("");
    const [password, setPassword] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [meterNumber, setMeterNumber] = useState("");
    const [apiBaseUrl, setApiBaseUrl] = useState("");

    // Quote
    const [destCountry, setDestCountry] = useState("");
    const [destState, setDestState] = useState("");
    const [destZip, setDestZip] = useState("");
    const [pkgWeight, setPkgWeight] = useState("");
    const [pkgValue, setPkgValue] = useState("");
    const [pkgLength, setPkgLength] = useState("");
    const [pkgWidth, setPkgWidth] = useState("");
    const [pkgHeight, setPkgHeight] = useState("");
    const { fedexConfig, saveConfigLoader } = useAppSelector(
        (state) => state.shippingZone
    );

    const { fedexServices, } = useAppSelector((state) => state.shippingZone);
    const validate = () => {
        const newErrors: Record<string, string> = {};

        // Settings tab
        if (!displayName.trim()) newErrors.displayName = "Display name is required";
        if (!dropOffType) newErrors.dropOffType = "Drop-off type is required";
        if (!packagingType) newErrors.packagingType = "Packaging type is required";
        if (!packingMethod) newErrors.packingMethod = "Packing method is required";
        if (!rateType) newErrors.rateType = "Rate type is required";
        if (!destinationType) newErrors.destinationType = "Destination type is required";
        if (deliveryServices.length === 0) newErrors.deliveryServices = "Select at least one delivery service";

        // Connection tab
        if (!key.trim()) newErrors.key = "Key is required";
        if (!accountNumber.trim()) newErrors.accountNumber = "Account number is required";
        if (!apiBaseUrl.trim()) newErrors.apiBaseUrl = "API base URL is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const [deliveryServices, setDeliveryServices] = useState<any[]>([]);

    const toggleService = (service: string) => {
        setDeliveryServices(prev =>
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    const handleSubmit = () => {
        if (!validate()) return;
        dispatch(saveFedexConfig({
            method_id: Number(methodId),
            data: {
                display_name: displayName,
                dropoff_type: dropOffType,
                packaging_type: packagingType,
                packing_method: packingMethod,
                rate_type: rateType,
                include_package_value: includePackageValue,
                destination_type: destinationType,
                enabled_services: deliveryServices,  // array of selected keys
                "client_id": key,
                "client_secret": password || "9e226d83d051430387fa960eeb996fcd",
                "account_number": accountNumber,
                "api_base_url": apiBaseUrl,
                // meter_number: meterNumber
            }
        })).then((result) => {
            if (saveFedexConfig.fulfilled.match(result)) {
                onOpenChange(false);
                if (methodId) dispatch(fetchFedexConfig({ method_id: Number(methodId) }));
            }
        });
    };

    useEffect(() => {
        if (methodId) dispatch(fetchFedexConfig({ method_id: Number(methodId) }));
    }, [methodId])


    useEffect(() => {
        if (fedexConfig) {
            setDisplayName(fedexConfig.display_name || "");
            setDropOffType(fedexConfig.dropoff_type || "");
            setPackagingType(fedexConfig.packaging_type || "");
            setPackingMethod(fedexConfig.packing_method || "");
            setRateType(fedexConfig.rate_type || "");
            setIncludePackageValue(fedexConfig.include_package_value ?? true);
            setDestinationType(fedexConfig.destination_type || "");
            setDeliveryServices(fedexConfig.enabled_services || []);
            // connection fields
            setKey(fedexConfig.client_id || "");
            setAccountNumber(fedexConfig.account_number || "");
            setApiBaseUrl(fedexConfig.api_base_url || "");
            setPassword(fedexConfig.client_secret || "");
        }
    }, [fedexConfig]);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col p-0">

                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-xl font-semibold">
                        Configure FedEx in United States
                    </DialogTitle>
                </DialogHeader>

                {/* Custom Tabs */}
                <div className="border-b bg-white px-6">
                    <div className="flex gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
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

                {/* Tab Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === "settings" && (
                        <div className="space-y-6">
                            {/* Display Name */}
                            <div className="space-y-2">
                                <Label>Display Name</Label>
                                <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                            </div>

                            {/* Drop-off Type */}
                            <div className="space-y-2">
                                <Label>Drop-off Type</Label>
                                <Select value={dropOffType} onValueChange={setDropOffType}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="REGULAR_PICKUP">Regular Pickup</SelectItem>
                                        <SelectItem value="REQUEST_COURIER">Request Courier</SelectItem>
                                        <SelectItem value="DROP_BOX">Drop Box</SelectItem>
                                        <SelectItem value="BUSINESS_SERVICE_CENTER">Business Service Center</SelectItem>
                                        <SelectItem value="STATION">Station</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Packaging Type, Packing Method, Rate Type, etc. */}
                            <div className="space-y-2">
                                <Label>Packaging Type</Label>
                                <Select value={packagingType} onValueChange={setPackagingType}>
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
                            </div>

                            <div className="space-y-2">
                                <Label>Packing Method</Label>
                                <Select value={packingMethod} onValueChange={setPackingMethod}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL_IN_ONE">All items in a single package</SelectItem>
                                        <SelectItem value="EACH_ITEM">Each item in its own package</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Rate Type</Label>
                                <Select value={rateType} onValueChange={setRateType}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LIST">List Rate</SelectItem>
                                        <SelectItem value="ACCOUNT">Account Rate</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-3">
                                <Checkbox
                                    checked={includePackageValue}
                                    onCheckedChange={(checked) => setIncludePackageValue(!!checked)}
                                />
                                <Label>Include Package Value</Label>
                            </div>

                            <div className="space-y-2">
                                <Label>Destination Type</Label>
                                <Select value={destinationType} onValueChange={setDestinationType}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                                        <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Delivery Services */}
                            <div className="space-y-4 pt-4">
                                <Label>Delivery services</Label>
                                <div className="text-sm text-gray-500 mb-3">Select: All | None</div>
                                <div className="grid grid-cols-1 gap-3 ">
                                    {Object.entries(fedexServices).map(([key, label]) => (
                                        <div key={key} className="flex items-center gap-3">
                                            <Checkbox
                                                checked={deliveryServices.includes(key)}
                                                onCheckedChange={() => toggleService(key)}
                                            />
                                            <span className="text-sm">{label as string}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "connection" && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label>Key</Label>
                                <Input value={key} onChange={(e) => setKey(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Account Number</Label>
                                <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                            </div>
                            {/* <div className="space-y-2">
                                <Label>Meter Number</Label>
                                <Input value={meterNumber} onChange={(e) => setMeterNumber(e.target.value)} />
                            </div> */}
                            <div className="space-y-2">
                                <Label>API Base URL</Label>
                                <Input value={apiBaseUrl} onChange={(e) => setApiBaseUrl(e.target.value)} />
                            </div>
                            {fedexConfig?.is_connected && (
                                <Button onClick={() => dispatch(disconnectFedex({ method_id: Number(methodId) })).then((result) => {
                                    if (fedexConfig.fulfilled.match(result)) {
                                        dispatch(fetchFedexConfig({ method_id: Number(methodId) }));
                                    }
                                })} variant="outline" className="text-red-500 border-red-300 hover:bg-red-50">
                                    Disconnect
                                </Button>
                            )}
                        </div>
                    )}
                    {activeTab === "quote" && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label>Destination country</Label>
                                <Select value={destCountry} onValueChange={setDestCountry}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="United States">United States</SelectItem>
                                        <SelectItem value="Canada">Canada</SelectItem>
                                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Destination state</Label>
                                <Select value={destState} onValueChange={setDestState}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="California">California</SelectItem>
                                        <SelectItem value="New York">New York</SelectItem>
                                        <SelectItem value="Texas">Texas</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Destination Zip/Postcode</Label>
                                <Input value={destZip} onChange={(e) => setDestZip(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Package weight</Label>
                                <Input type="number" value={pkgWeight} onChange={(e) => setPkgWeight(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Package value</Label>
                                <div className="flex items-center border rounded-md overflow-hidden">
                                    <span className="px-3 py-2 bg-gray-100 text-gray-500 border-r text-sm">$</span>
                                    <Input
                                        type="number"
                                        value={pkgValue}
                                        onChange={(e) => setPkgValue(e.target.value)}
                                        className="border-0 rounded-none focus-visible:ring-0"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Package length</Label>
                                <div className="flex items-center border rounded-md overflow-hidden">
                                    <Input
                                        type="number"
                                        value={pkgLength}
                                        onChange={(e) => setPkgLength(e.target.value)}
                                        className="border-0 rounded-none focus-visible:ring-0"
                                    />
                                    <span className="px-3 py-2 bg-gray-100 text-gray-500 border-l text-sm">Inches</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Package width</Label>
                                <div className="flex items-center border rounded-md overflow-hidden">
                                    <Input
                                        type="number"
                                        value={pkgWidth}
                                        onChange={(e) => setPkgWidth(e.target.value)}
                                        className="border-0 rounded-none focus-visible:ring-0"
                                    />
                                    <span className="px-3 py-2 bg-gray-100 text-gray-500 border-l text-sm">Inches</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Package height</Label>
                                <div className="flex items-center border rounded-md overflow-hidden">
                                    <Input
                                        type="number"
                                        value={pkgHeight}
                                        onChange={(e) => setPkgHeight(e.target.value)}
                                        className="border-0 rounded-none focus-visible:ring-0"
                                    />
                                    <span className="px-3 py-2 bg-gray-100 text-gray-500 border-l text-sm">Inches</span>
                                </div>
                            </div>
                            <Button variant="outline">Get quote</Button>
                        </div>
                    )}

                </div>

                {/* Sticky Footer */}
                <div className="sticky bottom-0 border-t bg-gray-50 px-6 py-4 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button disabled={saveConfigLoader} onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                        {saveConfigLoader ? "Saving..." : "Submit"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}