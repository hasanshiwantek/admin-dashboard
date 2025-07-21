// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


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
                            <Label htmlFor="pageTitle">Page Title</Label>
                            <Input id="pageTitle" placeholder="" {...register("pageTitle")}/>
                        </div>
                    
                        <div>
                            <Label htmlFor="productURL">Product URL</Label>
                            <Input id="ProductURL" placeholder="" {...register("productURL")}/>
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