// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";


export default function Dimensions() {

    const { register } = useFormContext();

    return (
        <section id="dimensionWeight" className="space-y-4 scroll-mt-20" >
            <div className="flex justify-center items-center flex-col">
            <h1>Fulfillment</h1>
            <p>Setup shipping and inventory details for this product.</p>
            </div>
            <div className="p-10 bg-white shadow-lg rounded-sm ">
                <h1 >Dimensions & Weight</h1>
                <p>Enter the dimensions and weight of this product to help calculate shipping rate. These measurements are for the product's shipping container. They are used to help calculate shipping price and do not show up on your storefront.</p>
                <div className="grid grid-cols-2 gap-6 my-4">
                    {/* Left Div */}
                    <div className="space-y-12">
                        <div>
                            <Label htmlFor="weight">Weight (LBS) <span className="!text-red-500">*</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HiQuestionMarkCircle />
                                            {/* <HiMiniQuestionMarkCircle /> */}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Specify a page title, or leave blank to use the products name as the page title.
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Label>
                            <Input id="weight" placeholder="0" {...register("weight")}/>
                        </div>
                        <div>
                            <Label htmlFor="height">Height (Inches) 
                                <span className="!text-red-500">*</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HiQuestionMarkCircle />
                                            {/* <HiMiniQuestionMarkCircle /> */}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Specify a page title, or leave blank to use the products name as the page title.
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Label>
                            <Input id="height" {...register("height")}/>
                        </div>

                    </div>

                    {/* Right Div */}
                    <div className="space-y-12">
                        <div>
                            <Label htmlFor="width">Width (Inches)
                                <span className="!text-red-500">*</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HiQuestionMarkCircle />
                                            {/* <HiMiniQuestionMarkCircle /> */}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Specify a page title, or leave blank to use the products name as the page title.
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Label>
                            <Input id="width" placeholder="" {...register("width")}/>
                        </div>

                        <div>
                            <Label htmlFor="depth">Depth (Inches) 
                                <span className="!text-red-500">*</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HiQuestionMarkCircle />
                                            {/* <HiMiniQuestionMarkCircle /> */}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Specify a page title, or leave blank to use the products name as the page title.
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Label>
                            <Input id="depth" {...register("depth")}/>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}