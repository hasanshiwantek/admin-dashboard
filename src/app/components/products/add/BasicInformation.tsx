// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryTree from "./CategoryTree";


export default function BasicInfoForm() {

    const { register } = useFormContext();

    return (
        <section id="basic-info" className="space-y-4 scroll-mt-20">
            <div className="p-10 bg-white">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                <div className="flex items-center space-x-2">
                    <Checkbox id="visible" />
                    <Label htmlFor="visible">Visible on Storefront</Label>
                </div>
                <div className="grid grid-cols-2 gap-6 my-4">
                    {/* Left Div */}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="productName">Product Name</Label>
                            <Input id="productName" name="productName" placeholder="Sample Product Name" />
                        </div>

                        <div>
                            <Label htmlFor="productType">Product Type</Label>
                            <Select name="productType">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="physical">Physical</SelectItem>
                                    <SelectItem value="digital">Digital</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="brand">Brand</Label>
                            <Select name="brand">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="brandA">Brand A</SelectItem>
                                    <SelectItem value="brandB">Brand B</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Right Div */}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="sku">SKU</Label>
                            <Input id="sku" name="sku" defaultValue="THX-1138" />
                        </div>

                        <div>
                            <Label htmlFor="price">Default Price</Label>
                            <Input id="price" name="price" type="number" defaultValue="35" />
                        </div>

                        <div>
                            <Label htmlFor="weight">Weight (lbs)</Label>
                            <Input id="weight" name="weight" type="number" defaultValue="0" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <h1>Categories</h1>
                    <Button> <Plus></Plus> Add Categories</Button>
                </div>
                     <CategoryTree name="categoryIds" />

            </div>
        </section>
    );
}