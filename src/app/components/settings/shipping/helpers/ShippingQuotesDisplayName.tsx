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
import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
    fetchShippingMethodById,
    updateShippingMethod,
} from "@/redux/slices/shippingSlice";

// ─── Types ────────────────────────────────────────────────────
interface DisplayNamePayload {
    displayName: string;
}

interface ShippingQuotesDisplayNameProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Called after a successful update — good for refreshing the list */
    onSubmit?: (data: DisplayNamePayload) => void;
    /** Shipping method id — when provided, data is fetched via get-method/{id} */
    methodId?: number | string;
}

// API response shape (from get-method/{id})
interface MethodApiData {
    id: number;
    charge_shipping_by: "by_weight" | "by_order_total";
    display_name: string;
    is_active: boolean;
    default_shipping_cost: string | null;
    rate_display_type: string | null;
    custom_description: string | null;
    ranges: any[] | null;
}

// ─── Component ────────────────────────────────────────────────
export default function ShippingQuotesDisplayName({
    open,
    onOpenChange,
    onSubmit,
    methodId,
}: ShippingQuotesDisplayNameProps) {
    const dispatch = useAppDispatch();

    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // fields we keep from the fetched record so update payload stays complete
    const [chargeShipping, setChargeShipping] = useState<
        "by_weight" | "by_order_total"
    >("by_weight");
    const [defaultShippingCost, setDefaultShippingCost] = useState<
        string | null
    >(null);
    const [rateDisplayType, setRateDisplayType] = useState<string>("fixed");
    const [isActive, setIsActive] = useState(true);
    const [customDescription, setCustomDescription] = useState("");
    const [ranges, setRanges] = useState<any[]>([]);

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

                // preserve everything else so update doesn't wipe it
                setChargeShipping(data.charge_shipping_by ?? "by_weight");
                setDefaultShippingCost(data.default_shipping_cost ?? null);
                setRateDisplayType(data.rate_display_type ?? "fixed");
                setIsActive(data.is_active ?? true);
                setCustomDescription(data.custom_description ?? "");
                setRanges(Array.isArray(data.ranges) ? data.ranges : []);
            } catch (err: any) {
                if (!active) return;
                console.error("[ShippingQuotesDisplayName] fetch error:", err);
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

    const handleSubmit = async () => {
        setError("");

        if (!displayName.trim()) {
            setError("Display name is required.");
            return;
        }

        if (!methodId) {
            setError("Missing method id.");
            return;
        }

        // Build API payload — only display_name changes, rest preserved
        const payload = {
            display_name: displayName.trim(),
            is_active: isActive,
            charge_shipping_by: chargeShipping,
            default_shipping_cost:
                defaultShippingCost != null && String(defaultShippingCost) !== ""
                    ? Number(defaultShippingCost)
                    : null,
            rate_display_type: rateDisplayType,
            custom_description: customDescription,
            ranges: Array.isArray(ranges)
                ? ranges.map((r) => ({
                      from: Number(r.from),
                      up_to: Number(r.up_to),
                      cost: Number(r.cost),
                  }))
                : [],
        };

        setSaving(true);
        try {
            await dispatch(
                updateShippingMethod({ method_id: Number(methodId), payload })
            ).unwrap();

            onSubmit?.({ displayName: displayName.trim() });

            onOpenChange(false);
        } catch (err: any) {
            console.error("[ShippingQuotesDisplayName] update error:", err);
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
            <DialogContent className="sm:max-w-[760px] max-h-[90vh] overflow-hidden flex flex-col p-0">

                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        Pickup options
                    </DialogTitle>
                </DialogHeader>

                {/* Tabs */}
                <div className="border-b bg-white px-6">
                    <div className="flex gap-8">
                        <button
                            type="button"
                            className="py-4 text-[15px] font-medium border-b-2 border-blue-600 text-blue-600"
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
                    <div>
                        <Label className="text-sm text-gray-600 font-medium">
                            Display name
                        </Label>
                        <Input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Ship on my own/company shipping account (mention shipping account on order comments)"
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end items-center gap-4 px-6 py-4 border-t bg-white">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-blue-600 hover:text-blue-700"
                        disabled={saving}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading || saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                    >
                        {saving ? "Saving…" : "Submit"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}