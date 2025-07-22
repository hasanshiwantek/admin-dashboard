// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AddModifierSheet from "./AddModifierSheet";


export default function Customizations() {

    const { register } = useFormContext();

    return (
        <section id="variations" className="space-y-4 scroll-mt-20">
       
            <div className="p-10 bg-white shadow-lg rounded-sm ">
                <h1 >Customizations</h1>
                <p>Add modifier options like a text box, checkbox, or file upload to enable further product customization.</p>
                <div className="mt-6">
                    <h2>Modifier Options</h2>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <p>No modifier option has been added yet</p>
                        <Sheet>
                            <SheetTrigger asChild>
                        <Button className="btn-outline-primary">
                            <Plus/> Add Modifier Option
                        </Button>
                        </SheetTrigger>
                        <AddModifierSheet />
                        </Sheet>
                    </div>
                </div>
                <div className="mt-6">
                    <h2>Rules</h2>
                    <div className="flex flex-col justify-center items-center mt-6  p-6">
                        <p>No rule has been added yet.</p>
                        <p>Rules can be added after adding Multiple Choice, Pick List, or Checkbox modifier options.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}