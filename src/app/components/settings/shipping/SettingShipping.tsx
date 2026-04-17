import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { deleteShippingZone, fetchShippingZones, updateShippingZone } from '@/redux/slices/shippingSlice';
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

const SettingShipping = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { zones, loading } = useAppSelector((state) => state.shippingZone);


    useEffect(() => {
        dispatch(fetchShippingZones());
    }, [dispatch])

    return (
        <div className="min-h-screen  p-8">
            <div className="">
                {/* <h1 className=" mb-6 !font-extralight 2xl:!text-[3.2rem]">Settings</h1> */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className=" text-gray-900 !font-extralight 2xl:!text-[3.2rem]">Shipping</h1>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-700 hover:underline transition-colors 2xl:!text-[1.6rem]"
                        >
                            Learn more
                        </a>
                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-700 hover:underline transition-colors 2xl:!text-[1.6rem]"
                        >
                            Video tutorial
                        </a>
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="  mb-3  !text-black !font-bold  text-[15px] 2xl:!text-[1.6rem]">Shipping origin</h2>
                    <p className=" leading-relaxed  mt-5 text-gray-600 2xl:!text-[1.6rem]">
                        The shipping origin is the address where you ship your products from.
                        It is also used to calculate the shipping rates displayed to your customers within the checkout.
                    </p>
                </div>
                <Card className="p-6 bg-white shadow-sm mt-10">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <div className="mt-5 text-2xl text-gray-700 leading-relaxed">
                                <p>440 N Barranca Ave,</p>
                                <p>Suite 1032</p>
                                <p>Covina CA 91723</p>
                                <p>United States</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn-outline-primary"
                        >
                            Edit
                        </button>
                    </div>
                </Card>
                <div className="flex-1 mt-10">
                    <h2 className="text-xl  mb-3  text-black !font-bold   text-[15px] 2xl:!text-[1.6rem]">Checkout shipping options</h2>

                    <p className=" leading-relaxed  mt-5 text-gray-600 2xl:!text-[1.6rem]">
                        Manage your shipping zones, carriers and rukes you want to offer to your customers within the checkout.
                    </p>
                </div>
                <Card className="p-6 bg-white shadow-sm mt-6">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-gray-600 text-[15px] 2xl:!text-[1.6rem]">
                            Configure your shipping rules
                        </h3>
                        <button type="button"
                            className="btn-outline-primary">
                            Add shipping zone
                            <span className="text-xs">▼</span>
                        </button>
                    </div>

                    <div className=" rounded-lg overflow-hidden  p-4">

                        {/* Header */}
                        <div className="bg-white px-6 py-3  font-semibold 2xl:!text-[1.6rem] flex items-center justify-between">
                            <span className=' !text-black font-semibold  text-[15px] 2xl:!text-[1.6rem] '>Basic shipping rules</span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 8L6 4L10 8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>


                        {/* Rule 2: United States */}
                        {/* {zones?.map((item) => {
                            return <div className="px-6 py-6 flex items-center gap-6 hover:bg-gray-50">
                                <div className="w-10 flex-shrink-0 flex items-center justify-center pt-0.5">
                                    <div className="w-10 h-8  overflow-hidden  border-gray-200 flex-shrink-0">
                                        {item.id == 1 ? <img
                                            src="https://flagcdn.com/w80/us.png"
                                            alt="US"
                                            className="w-full h-full object-cover"
                                        /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                                        </svg>}
                                    </div>
                                </div>
                                <div className="w-36 flex-shrink-0 pt-0.5">
                                    <p className="font-medium text-gray-600 2xl:!text-[1.6rem]">{item?.name}</p>
                                </div>

                                <div className="flex flex-1 items-start justify-between gap-4">
                                    <p className="text-gray-600 2xl:!text-[1.6rem] leading-relaxed">
                                        FedEx &nbsp;&nbsp;&nbsp; Flat Rate for under 10 LBS item<br />
                                        I will provide the shipping label/others (Mentions the details on below comments box)
                                    </p>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        {item.id !== 2 && <Toggle checked={item.is_active ? true : false} onChange={() => dispatch(updateShippingZone({
                                            zone_id: item.id,
                                            data: {
                                                name: item?.name,
                                                is_active: !item.is_active
                                            }
                                        }))} />}

                                        <button
                                            type="button"
                                            className="btn-outline-primary"
                                            onClick={() => router.replace("/manage/settings/shipping/" + item?.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-outline-primary"
                                            onClick={() => dispatch(deleteShippingZone({ zone_id: item?.id }))}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>
                        })} */}
                        {loading ? (
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
                        ) : (
                            zones?.map((item) => (
                                <div key={item.id} className="px-6 py-6 flex items-center gap-6 hover:bg-gray-50">
                                    {/* Col 1: Icon */}
                                    <div className="w-10 flex-shrink-0 flex items-center justify-center pt-0.5">
                                        <div className="w-10 h-8 overflow-hidden border-gray-200 flex-shrink-0">
                                            {item.id == 1 ? (
                                                <img src="https://flagcdn.com/w80/us.png" alt="US" className="w-full h-full object-cover" />
                                            ) : (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>

                                    {/* Col 2: Country Name */}
                                    <div className="w-36 flex-shrink-0 pt-0.5">
                                        <p className="font-medium text-gray-600 2xl:!text-[1.6rem]">{item?.name}</p>
                                    </div>

                                    {/* Col 3: Description + Toggle + Buttons */}
                                    <div className="flex flex-1 items-start justify-between gap-4">
                                        <p className="text-gray-600 2xl:!text-[1.6rem] leading-relaxed">
                                            FedEx &nbsp;&nbsp;&nbsp; Flat Rate for under 10 LBS item<br />
                                            I will provide the shipping label/others (Mentions the details on below comments box)
                                        </p>
                                        {item.id !== 2 && <div className="flex items-center gap-3 flex-shrink-0">

                                            <Toggle
                                                checked={item.is_active ? true : false}
                                                onChange={() => dispatch(updateShippingZone({
                                                    zone_id: item.id,
                                                    data: { name: item?.name, is_active: !item.is_active }
                                                })).finally(() => {
                                                    dispatch(fetchShippingZones())
                                                })}
                                            />

                                            <button
                                                type="button"
                                                className="btn-outline-primary"
                                                onClick={() => router.replace("/manage/settings/shipping/" + item?.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-outline-primary"
                                                onClick={() => dispatch(deleteShippingZone({ zone_id: item?.id })).finally(() => {
                                                    dispatch(fetchShippingZones())
                                                })}
                                            >
                                                X
                                            </button>
                                        </div>}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Shipping address form display */}
                    <div className="mt-8  p-4">
                        <h3 className="text-xl  mb-3  text-black !font-bold   text-[15px] 2xl:!text-[1.6rem]">Shipping address form display</h3>
                        <p className=" leading-relaxed  mt-5 mb-5 text-gray-600 2xl:!text-[1.6rem]">
                            Control which countries are shown in the country drop down at checkout when shoppers
                            enter their shipping address. Your configured shipping rules will still apply.
                            This setting does not mean you will ship to those countries, only that shoppers can enter their full address.
                        </p>
                        <RadioGroup
                        // value={imageOption}
                        // onValueChange={(val) => setValue("imageOption", val)}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="useThumbnail" id="useThumbnail" />
                                <Label className="2xl:!text-2xl" htmlFor="useThumbnail">
                                    Display all countries, regardless of my shipping settings
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dontUse" id="dontUse" />
                                <Label className="2xl:!text-2xl" htmlFor="dontUse">
                                    Only display countries when a shipping method is available
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </Card>
            </div >
        </div >
    )
}

export default SettingShipping