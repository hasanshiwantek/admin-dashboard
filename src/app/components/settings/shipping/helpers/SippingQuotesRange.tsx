"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
    fetchShippingMethodById,
    updateShippingMethod,
} from "@/redux/slices/shippingSlice";

// ─── Types ────────────────────────────────────────────────────
interface RangeRow {
    from: string;
    upTo: string;
    cost: string;
}

interface ShipByWeightPayload {
    displayName: string;
    chargeShipping: "by_weight" | "by_order_total";
    defaultShippingCost: string;
    type: string;
    ranges: RangeRow[];
}

interface ShipByWeightModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Called after a successful update — good for refreshing the list */
    onSubmit?: (data: ShipByWeightPayload) => void;
    /** Shipping method id — when provided, data is fetched via get-method/{id} */
    methodId?: number | string;
}

// API response shape (from get-method/{id})
interface MethodApiRange {
    from: number;
    up_to: number;
    cost: number;
}

interface MethodApiData {
    id: number;
    charge_shipping_by: "by_weight" | "by_order_total";
    display_name: string;
    is_active: boolean;
    default_shipping_cost: string | null;
    rate_display_type: string | null;
    custom_description: string | null;
    ranges: MethodApiRange[] | null;
}

// ─── Small reusable error message ─────────────────────────────
function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-xs text-red-500 mt-1">{message}</p>;
}

const emptyRange: RangeRow = { from: "", upTo: "", cost: "" };

// ─── Component ────────────────────────────────────────────────
export default function ShipByWeightModal({
    open,
    onOpenChange,
    onSubmit,
    methodId,
}: ShipByWeightModalProps) {
    const dispatch = useAppDispatch();

    const [displayName, setDisplayName] = useState("");
    const [chargeShipping, setChargeShipping] = useState<
        "by_weight" | "by_order_total"
    >("by_weight");
    const [defaultShippingCost, setDefaultShippingCost] = useState("");
    const [type, setType] = useState("$");
    const [ranges, setRanges] = useState<RangeRow[]>([{ ...emptyRange }]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // fields we keep from the fetched record so update payload stays complete
    const [isActive, setIsActive] = useState(true);
    const [customDescription, setCustomDescription] = useState("");

    // ─── Fetch method by id and prefill ────────────────────────
    useEffect(() => {
        if (!open || !methodId) return;

        let active = true;

        const fetchMethod = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await dispatch(
                    fetchShippingMethodById({ method_id: methodId })
                ).unwrap();

                if (!active) return;

                const data: MethodApiData = res.data;

                setDisplayName(data.display_name ?? "");
                setChargeShipping(data.charge_shipping_by ?? "by_weight");
                setDefaultShippingCost(
                    data.default_shipping_cost != null
                        ? String(data.default_shipping_cost)
                        : ""
                );
                // rate_display_type "fixed"/"percentage" → map to $ / %
                setType(
                    data.rate_display_type === "percentage" ? "%" : "$"
                );
                setIsActive(data.is_active ?? true);
                setCustomDescription(data.custom_description ?? "");

                const mappedRanges: RangeRow[] =
                    Array.isArray(data.ranges) && data.ranges.length
                        ? data.ranges.map((r) => ({
                            from: r.from != null ? String(r.from) : "",
                            upTo: r.up_to != null ? String(r.up_to) : "",
                            cost: r.cost != null ? String(r.cost) : "",
                        }))
                        : [{ ...emptyRange }];

                setRanges(mappedRanges);
            } catch (err: any) {
                if (!active) return;
                console.error("[ShipByWeightModal] fetch error:", err);
                setError(
                    typeof err === "string"
                        ? err
                        : err?.message || "Failed to load shipping method."
                );
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchMethod();

        return () => {
            active = false;
        };
    }, [open, methodId, dispatch]);

    // Reset error state when closing
    useEffect(() => {
        if (!open) {
            setError("");
        }
    }, [open]);

    const updateRange = (
        index: number,
        field: keyof RangeRow,
        value: string
    ) => {
        setRanges((prev) =>
            prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
        );
    };

    const addRange = () => {
        setRanges((prev) => [...prev, { ...emptyRange }]);
    };

    const removeRange = (index: number) => {
        setRanges((prev) =>
            prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
        );
    };

    const handleSubmit = async () => {
        setError("");

        if (!displayName.trim()) {
            setError("Display name is required.");
            return;
        }

        for (const [i, r] of ranges.entries()) {
            if (r.from !== "" && isNaN(Number(r.from))) {
                setError(`Range ${i + 1}: "From" must be a valid number.`);
                return;
            }
            if (r.upTo !== "" && isNaN(Number(r.upTo))) {
                setError(`Range ${i + 1}: "Up to" must be a valid number.`);
                return;
            }
            if (r.cost !== "" && isNaN(Number(r.cost))) {
                setError(`Range ${i + 1}: "Cost" must be a valid number.`);
                return;
            }
        }

        // Build API payload
        const payload = {
            display_name: displayName.trim(),
            is_active: isActive,
            charge_shipping_by: chargeShipping,
            default_shipping_cost:
                defaultShippingCost.trim() === ""
                    ? null
                    : Number(defaultShippingCost),
            rate_display_type: type === "%" ? "percentage" : "fixed",
            custom_description: customDescription,
            ranges: ranges
                // drop fully empty rows
                .filter(
                    (r) =>
                        r.from !== "" || r.upTo !== "" || r.cost !== ""
                )
                .map((r) => ({
                    from: Number(r.from),
                    up_to: Number(r.upTo),
                    cost: Number(r.cost),
                })),
        };

        if (!methodId) {
            setError("Missing method id.");
            return;
        }

        setSaving(true);
        try {
            await dispatch(
                updateShippingMethod({ method_id: Number(methodId), payload })
            ).unwrap();

            onSubmit?.({
                displayName: displayName.trim(),
                chargeShipping,
                defaultShippingCost,
                type,
                ranges,
            });

            onOpenChange(false);
        } catch (err: any) {
            console.error("[ShipByWeightModal] update error:", err);
            setError(
                typeof err === "string"
                    ? err
                    : err?.message || "Failed to update shipping method."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[760px] max-h-[90vh] overflow-hidden flex flex-col p-5">

                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-8">
                    <DialogTitle className="!text-[20px] !font-semibold !text-[#313440]">
                        Ship by weight or order total options
                    </DialogTitle>
                </DialogHeader>

                {/* Tabs */}
                <div className="border-b bg-white px-6">
                    <div className="flex gap-8">
                        <button
                            type="button"
                            className="py-4 text-[15px] !text-[#34313f] font-medium border-b-4 border-blue-600 text-blue-600"
                        >
                            Settings
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 py-6 overflow-y-auto space-y-6">
                    {loading && (
                        <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm px-3 py-2 rounded-lg">
                            Loading…
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Display name */}
                    <div  className="w-full" >
                        <Label className="!text-[15px] text-[#5D5B66] font-medium">
                            Display name
                        </Label>
                        <Input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Flat Rate for under 10 LBS*"
                            className="mt-1 h-15 max-w-[470px] "
                        />
                    </div>

                    {/* Charge shipping */}
                    <div className="!mt-10">
                        <Label className="!text-[15px] text-[#5D5B66]  font-medium">
                            Charge shipping
                        </Label>
                        <Select
                            value={chargeShipping}
                            onValueChange={(v) =>
                                setChargeShipping(v as "by_weight" | "by_order_total")
                            }
                        >
                            <SelectTrigger className="mt-1 w-full !h-[16] sm:w-[280px]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="by_weight">By weight</SelectItem>
                                {/* <SelectItem value="by_order_total">
                                    By order total
                                </SelectItem> */}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Default shipping cost + Type */}
                    <div className="flex flex-col gap-2 !mt-10 mb-8 sm:flex-row sm:items-end sm:gap-3">
                        <div className="flex-1">
                            <Label className="!text-[15px] text-[#5D5B66]  font-medium">
                                Default shipping cost{" "}
                                <span className="text-gray-400 font-normal">
                                    (optional)
                                </span>
                            </Label>
                            <Input
                                value={defaultShippingCost}
                                onChange={(e) =>
                                    setDefaultShippingCost(e.target.value)
                                }
                                placeholder=""
                                className="mt-1"
                            />
                        </div>
                        <div className="w-full sm:w-[220px]">
                            <Label className="!text-[15px] text-[#5D5B66]  font-medium">
                                Type
                            </Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger className="mt-1 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="$">$</SelectItem>
                                    {/* <SelectItem value="%">%</SelectItem> */}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Ranges */}
                    <div className=" mt-5">
                        <h3 className="!text-[20px] !font-semibold text-[#34313f] mb-9">
                            Ranges
                        </h3>

                        {/* Column headers */}
                        <div className="flex gap-4 mb-2">
                            <div className="flex-1">
                                <Label className="!text-[15px] text-[#5D5B66] font-medium">
                                    From
                                </Label>
                            </div>
                            <div className="flex-1">
                                <Label className="!text-[15px] text-[#5D5B66] font-medium">
                                    Up to (but not inc.)
                                </Label>
                            </div>
                            <div className="flex-1">
                                <Label className="!text-[15px] text-[#5D5B66] font-medium">
                                    Cost
                                </Label>
                            </div>
                            <div className="w-[44px]" />
                        </div>

                        <div className="space-y-3">
                            {ranges.map((range, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 items-center"
                                >
                                    <div className="flex-1">
                                        <Input
                                            value={range.from}
                                            onChange={(e) =>
                                                updateRange(
                                                    index,
                                                    "from",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="0.00"
                                            className="h-14"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            value={range.upTo}
                                            onChange={(e) =>
                                                updateRange(
                                                    index,
                                                    "upTo",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="1 000.00"
                                            className="h-14"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                                {type}
                                            </span>
                                            <Input
                                                value={range.cost}
                                                onChange={(e) =>
                                                    updateRange(
                                                        index,
                                                        "cost",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="10.00"
                                                className="pl-7 h-14"
                                            />
                                        </div>
                                    </div>

                                    {/* Add on last row, remove on others */}
                                    {index === ranges.length - 1 ? (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={addRange}
                                            className="h-14 w-14 border-blue-500 text-blue-600 rounded-none hover:bg-blue-50 shrink-0"
                                        >
                                            <Plus size={44} />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeRange(index)}
                                            className="border-red-300 text-red-500 hover:bg-red-50 shrink-0"
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end items-center gap-4 px-6 py-4 ">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-blue-600 h-14 px-8 !text-[14px] hover:text-blue-700"
                        disabled={saving}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading || saving}
                        className="bg-blue-600 h-14 px-8 !text-[14px] hover:bg-blue-700 text-white disabled:opacity-50"
                    >
                        {saving ? "Saving…" : "Submit"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}