// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


export default function Inventory() {

    const { register } = useFormContext();
 
    return (
        <section id="inventory" className="">
            <div className="p-10 bg-white shadow-lg rounded-sm ">
                <h1 >Inventory</h1>
                <div className="flex items-center space-x-2 my-6 ">
                    <Checkbox id="visible" {...register("trackInventory")}/>
                    <Label htmlFor="visible">Track Inventory</Label>
                </div>
                

            </div>
        </section>
    );
}