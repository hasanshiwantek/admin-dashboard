// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function Variations() {

    const { register } = useFormContext();

    return (
        <section id="variations" className="space-y-4 scroll-mt-20">
            <div className="flex justify-center items-center flex-col">
            <h1>Product Options</h1>
            <span>Create product variations and customizations</span>
            </div>

            <div className="p-10 bg-white shadow-sm rounded-sm space-y-5">
                <h1 >Variations</h1>
                <span>Add variant options like size and color to create variants for this product. </span>
                <div className="mt-6">
                    <h2>Variant Options</h2>
                    <div className="flex flex-col justify-center items-center gap-5 mt-4">
                        <span>No Option has been added yet.</span>
                        <button className="btn-outline-primary flex items-center"><Plus className="!h-5 !w-5"/> Add Variant Option</button>
                    </div>
                </div>
                <div className="mt-6">
                    <h2>Variants</h2>
                    <div className="flex justify-center items-center mt-6 border  p-6">
                        <span>Variants will be created after adding Options.</span>
                    </div>
                </div>
            </div>
        </section>
    );
}