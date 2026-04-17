import React, { useEffect, useState } from "react";
import FedExConfigModal from "./FedExConfigModal";
import Image from "next/image";
import { fetchFedexConfig, fetchFedexServices, fetchShippingMethods, toggleShippingMethod } from "@/redux/slices/shippingSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useParams, usePathname } from "next/navigation";

const FreeShippingIcon = () => (
    <div style={{
        width: 44, height: 44, borderRadius: 6, border: "1px solid #e0e0e0",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", background: "#f9f9f9", gap: 1, flexShrink: 0
    }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: "#1976d2", letterSpacing: "0.04em" }}>FREE</span>
        <span style={{ fontSize: 8, fontWeight: 600, color: "#1976d2", letterSpacing: "0.03em" }}>SHIPPING</span>
    </div>
);

const FlatRateIcon = () => (
    <div style={{
        width: 44, height: 44, borderRadius: 6, border: "1px solid #e0e0e0",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", background: "#f9f9f9", gap: 1, flexShrink: 0
    }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: "#888", letterSpacing: "0.04em" }}>FLAT</span>
        <span style={{ fontSize: 8, fontWeight: 600, color: "#888", letterSpacing: "0.03em" }}>RATE</span>
    </div>
);

const WeightIcon = () => (
    <div style={{
        width: 44, height: 44, borderRadius: 6, border: "1px solid #e0e0e0",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#f9f9f9", flexShrink: 0
    }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
        </svg>
    </div>
);

const PickupIcon = () => (
    <div style={{
        width: 44, height: 44, borderRadius: 6, border: "1px solid #e0e0e0",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#f9f9f9", flexShrink: 0
    }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    </div>
);

const Toggle = ({ checked, onChange }: any) => (
    <div
        onClick={() => onChange(!checked)}
        style={{
            width: 38, height: 22, borderRadius: 11, cursor: "pointer",
            background: checked ? "#1976d2" : "#ccc",
            position: "relative", transition: "background 0.2s", flexShrink: 0
        }}
    >
        <div style={{
            position: "absolute", top: 3, left: checked ? 19 : 3,
            width: 16, height: 16, borderRadius: "50%", background: "#fff",
            transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
        }} />
    </div>
);

const EditButton = ({ onClick }: any) => (
    <div style={{ display: "flex", flexShrink: 0 }}>
        <button
            onClick={onClick}
            style={{
                fontSize: 13, padding: "4px 12px",
                border: "1px solid #d0d0d0", borderRight: "none",
                borderRadius: "4px 0 0 4px", background: "#fff",
                color: "#333", cursor: "pointer"
            }}
        >
            Edit
        </button>
        <button style={{
            fontSize: 12, padding: "4px 8px",
            border: "1px solid #d0d0d0",
            borderRadius: "0 4px 4px 0", background: "#fff",
            color: "#555", cursor: "pointer"
        }}>
            ▾
        </button>
    </div>
);

const ShippingRow = ({ icon, name, badge, description, enabled, showEdit, onToggle }: any) => (
    <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "16px 20px", borderBottom: "1px solid #f0f0f0"
    }}>
        {icon}
        <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#222" }}>{name}</span>
                {badge && (
                    <span style={{
                        fontSize: 10, fontWeight: 600, background: "#e8f5e9",
                        color: "#2e7d32", borderRadius: 3, padding: "1px 6px"
                    }}>{badge}</span>
                )}
            </div>
            <p style={{ fontSize: 13, color: "#777", margin: 0, lineHeight: 1.5 }}>{description}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Toggle checked={enabled} onChange={onToggle} />
            {showEdit && enabled && <EditButton />}
        </div>
    </div>
);

export default function ShippingQuotes() {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { shippingMethods, methodsLoader, fedexConfig, fedexLoader } = useAppSelector(
        (state) => state.shippingZone
    );
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([
        {
            id: "free",
            name: "Free shipping",
            badge: "Recommended",
            description: "Use free shipping to improve checkout conversion, increase average order value and reduce abandoned carts.",
            icon: <FreeShippingIcon />,
            enabled: false,
            showEdit: false,
        },
        {
            id: "flat",
            name: "Flat rate",
            badge: null,
            description: "Charge a fixed shipping cost per order or per item.",
            icon: <FlatRateIcon />,
            enabled: false,
            showEdit: false,
        },
        {
            id: "weight",
            name: "Flat Rate for under 10 LBS Item",
            badge: null,
            description: "Calculate shipping cost based on order value or the total weight of items.",
            icon: <WeightIcon />,
            enabled: true,
            showEdit: true,
        },
        {
            id: "pickup",
            name: "I will provide the shipping label/others (Mentions the details on below comments box)",
            badge: null,
            description: "Your customers can pick up / collect their orders from your store's physical retail location.",
            icon: <PickupIcon />,
            enabled: true,
            showEdit: true,
        },
    ]);
    const [realTimeShippingQuotes, setRealTimeShippingQuotes] = useState([
        {
            id: "fedEx",
            name: "FedEx",
            badge: "Recommended",
            description: "FedEx Express provides delivery services to evey U.S. address and more than 220 countries and territories around the world.",
            icon: "https://1000logos.net/wp-content/uploads/2021/04/Fedex-logo.png",
            // icon: <FreeShippingIcon />,
            enabled: true,
            showEdit: true,
        },

    ]);

    const toggle = (method_id: any) => {
        dispatch(toggleShippingMethod({ method_id })).finally(() => {
            dispatch(fetchShippingMethods({ zone_id: Number(id) }));
        })
    };
    const toggleRealTimeShippingQuotes = (id: any) => {
        setRealTimeShippingQuotes((prev) =>
            prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
        );
    };


    useEffect(() => {
        dispatch(fetchFedexServices());
        if (id) dispatch(fetchShippingMethods({ zone_id: Number(id) }));
    }, [id]);

    return (
        <React.Fragment>
            {open && <FedExConfigModal
                open={open}
                onOpenChange={setOpen}
                methodId={3}
            />}
            <div style={{ padding: 24, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0, color: "#111" }}>United States</h1>
                    <button style={{
                        fontSize: 13, padding: "5px 16px",
                        border: "1px solid #d0d0d0", borderRadius: 4,
                        background: "#fff", color: "#333", cursor: "pointer"
                    }}>Edit</button>
                </div>

                <p style={{ fontSize: 12, fontWeight: 600, color: "#999", letterSpacing: "0.05em", textTransform: "uppercase", margin: "16px 0 12px" }}>
                    Static shipping quotes
                </p>

                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, overflow: "hidden" }}>
                    {methodsLoader ? (
                        // Skeleton Loader
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="px-6 py-6 flex items-center gap-6">
                                {/* Icon skeleton */}
                                <div className="w-10 h-8 bg-gray-200 animate-pulse rounded flex-shrink-0" />
                                {/* Name skeleton */}
                                <div className="w-36 flex-shrink-0">
                                    <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                                </div>
                                {/* Description + buttons skeleton */}
                                <div className="flex flex-1 items-start justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-64" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-80" />
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <div className="w-10 h-5 bg-gray-200 animate-pulse rounded-full" />
                                        <div className="w-14 h-8 bg-gray-200 animate-pulse rounded" />
                                        <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (shippingMethods?.map((row, i) => (
                        <div key={row.id} style={{ borderBottom: i < rows.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
                                {/* {row.icon} */}
                                {/* <FreeShippingIcon /> */}
                                <Image
                                    src={"https://upload.wikimedia.org/wikipedia/commons/7/74/Earth_globe.png"}
                                    alt={row.display_name || "icon"}
                                    width={28}
                                    height={28}
                                    className="object-contain"
                                    priority={false}        // 
                                />

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                        <span style={{ fontSize: 14, fontWeight: 500, color: "#222" }}>{row.display_name}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: "#777", margin: 0, lineHeight: 1.5 }}>{row.custom_description}</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                                    <Toggle checked={row.is_active ? true : false} onChange={() => toggle(row.id)} />
                                    {row.is_active && <EditButton />}
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div>

            <div style={{ padding: 24, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", width: "100%" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#999", letterSpacing: "0.05em", textTransform: "uppercase", margin: "16px 0 12px" }}>
                    Real time shipping quotes
                </p>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, overflow: "hidden" }}>
                    {fedexLoader ? (
                        // Skeleton Loader
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="px-6 py-6 flex items-center gap-6">
                                {/* Icon skeleton */}
                                <div className="w-10 h-8 bg-gray-200 animate-pulse rounded flex-shrink-0" />
                                {/* Name skeleton */}
                                <div className="w-36 flex-shrink-0">
                                    <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                                </div>
                                {/* Description + buttons skeleton */}
                                <div className="flex flex-1 items-start justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-64" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-80" />
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <div className="w-10 h-5 bg-gray-200 animate-pulse rounded-full" />
                                        <div className="w-14 h-8 bg-gray-200 animate-pulse rounded" />
                                        <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (realTimeShippingQuotes.map((row, i) => (
                        <div key={row.id} style={{ borderBottom: i < rows.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
                                {/* {row.icon} */}
                                <Image
                                    src={row.icon}
                                    alt={row.name || "icon"}
                                    width={28}
                                    height={28}
                                    className="object-contain"
                                    priority={false}        // optional
                                />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                        <span style={{ fontSize: 14, fontWeight: 500, color: "#222" }}>{row.name}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: "#777", margin: 0, lineHeight: 1.5 }}>{row.description}</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                                    <Toggle checked={row.enabled} onChange={() => toggleRealTimeShippingQuotes(row.id)} />
                                    {row.showEdit && row.enabled && <EditButton onClick={() => setOpen(true)} />}
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        </React.Fragment>
    );
}