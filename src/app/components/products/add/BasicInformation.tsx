// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectItem 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryTree from "./CategoryTree";


export default function BasicInfoForm() {

    const { register, setValue, watch } = useFormContext();
    const productType = watch("productType");
    const isVisible = watch("isVisible");

    return (
        <section id="basic-info" className="space-y-4 scroll-mt-20">
            <div className="flex justify-center items-center flex-col">
            <h1>Product Information</h1>
            <p>Information to help define a product.</p>
            </div>
            <div className="p-10 bg-white shadow-lg rounded-sm ">
                <h1 >Basic Information</h1>
                <div className="flex items-center space-x-2 my-6 ">
                    <Checkbox id="isVisible"  checked={!!isVisible} onCheckedChange={(checked) => setValue("isVisible", checked === true)}/>
                    <Label htmlFor="isVisible">Visible on Storefront</Label>
                </div>
                <div className="grid grid-cols-2 gap-6 my-4">
                    {/* Left Div */}
                    <div className="space-y-12">
                        <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" placeholder="Sample Product Name" {...register("name")}/>
                        </div>

                        <div>
                            <Label htmlFor="productType">Product Type</Label>

                            <Select 
                            value={productType}
                            onValueChange={(value) => setValue("productType", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectItem value="physical">Physical</SelectItem>
                                    <SelectItem value="digital">Digital</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="brandId">Brand</Label>
                            <Select 
                            value={String(watch("brandId") ?? "")}
                            onValueChange={(value) => setValue("brandId", Number(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Brand A</SelectItem>
                                    <SelectItem value="2">Brand B</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Right Div */}
                    <div className="space-y-12">
                        <div>
                            <Label htmlFor="sku">SKU</Label>
                            <Input id="sku" placeholder="THX-1138" {...register("sku")}/>
                        </div>

                        <div>
                            <Label htmlFor="price">Default Price</Label>
                            <Input id="price" type="number" defaultValue="35" {...register("price")}/>
                        </div>

                        <div>
                            <Label htmlFor="dimensions.weight">Weight (lbs)</Label>
                            <Input id="weight" type="number" defaultValue="0" {...register("dimensions.weight")}/>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between my-5">
                    <h1>Categories</h1>
                    <Button className="bg-transparent shadow-none text-blue-600 text-xl hover:bg-blue-100 transition-all p-6 cursor-pointer"> <Plus></Plus> Add Categories</Button>
                </div>
                     <CategoryTree name="categoryIds" />

            </div>
        </section>
    );
}