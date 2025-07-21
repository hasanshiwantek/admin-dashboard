// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";



export default function Seo() {

    const { register, setValue, watch } = useFormContext();
    const productType = watch("productType");
    const brand = watch("brand");

    return (
        <section id="seo" className="space-y-4 scroll-mt-20">
            <div className="flex justify-center items-center flex-col">
            <h1>SEO & Sharing</h1>
            <p>Boost traffic to your online business.</p>
            </div>
            <div className="p-10 bg-white shadow-lg rounded-sm ">
                <h1 >Search Engine Optimization</h1>
                <div className="grid grid-cols-2 gap-6 my-4">
                        <div>
                        <Label htmlFor="pageTitle">
                            Page Title
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
                            <Input id="pageTitle" placeholder="" {...register("pageTitle")}/>
                        </div>
                    
                        <div className="space-x-6">
                            <Label htmlFor="productURL">Product URL <span className="!text-red-500">*</span></Label>
                            <Input id="ProductURL" placeholder="" {...register("productURL")}/>
                            <Button>Reset</Button>
                        </div>
                </div>

                <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Input id="metaDescription" placeholder="" {...register("metaDescription")} className="!min-w-[75rem]"/>
                </div>
            </div>
        </section>
    );
}