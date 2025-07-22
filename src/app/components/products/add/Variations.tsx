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
            <p>Create product variations and customizations</p>
            </div>

            <div className="p-10 bg-white shadow-lg rounded-sm ">
                <h1 >Variations</h1>
                <p>Add variant options like size and color to create variants for this product. </p>
                <div className="mt-6">
                    <h2>Variant Options</h2>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <p>No Option has been added yet.</p>
                        <Button className="btn-outline-primary"><Plus/> Add Variant Option</Button>
                    </div>
                </div>
                <div className="mt-6">
                    <h2>Variants</h2>
                    <div className="flex justify-center items-center mt-6 border border-1 p-6">
                        <p>Variants will be created after adding Options.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}