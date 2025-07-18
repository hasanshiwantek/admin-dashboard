"use client";
// AddProductPage.tsx
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import SidebarNavigation from "./SidebarNavigation";
import BasicInfoForm from "./BasicInformation";
import DescriptionEditor from "./DescriptionEditor";

export default function AddProductPage() {
    const methods = useForm();
    const onSubmit = methods.handleSubmit((data) => console.log(data));

    return (
        <div>
            <div className=" items-center mb-4">
                <h1 className="!text-5xl !font-extralight !text-gray-600 !my-5">
                    Products
                </h1>
            </div>
            <div className="flex">
                <SidebarNavigation />
                <FormProvider {...methods}>
                    <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
                        <BasicInfoForm />
                        <DescriptionEditor />
                        <Button type="submit">Save Product</Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
