// BasicInfoForm.tsx
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { HiQuestionMarkCircle } from "react-icons/hi2";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


export default function RelatedProducts() {

    const { register, control } = useFormContext();
 
    return (
        <div id="relatedProducts" className="p-10 bg-white shadow-lg rounded-sm ">
            <h1 >Related Products</h1>
            <Controller
                control={control}
                name="relatedProducts"
                defaultValue={false}
                render={({ field }) => (
                    <div className="flex items-center space-x-2 mt-6">
                        <Checkbox
                            id="relatedProducts"
                            checked={field.value}
                            onCheckedChange={(val) => field.onChange(val === true)}
                        />
                        <Label htmlFor="relatedProducts">
                            Automatically show related products on my storefront
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HiQuestionMarkCircle />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        When enabled, we'll find related products for you. Untick this to surface the ability to select specific products.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                    </div>
                )}
            />

        </div>
    );
}