// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";

export default function ProductIdentifiers() {

    const { register } = useFormContext();

    return (
        <section id="productIdentifiers" className="">
           
            <div className="p-10 bg-white shadow-lg rounded-sm ">
                <h1 >Product Identifiers</h1>
                <div className="grid grid-cols-2 gap-6 my-4">
                    {/* Left Div */}
                    <div className="space-y-12">
                        <div>
                            <Label htmlFor="sku">SKU</Label>
                            <Input id="sku" placeholder="" {...register("sku")}/>
                        </div>
                         <div>
                            <Label htmlFor="productUPC/EAN">Product UPC/EAN</Label>
                            <Input id="productUPC/EAN" placeholder="" {...register("productUPC/EAN")}/>
                        </div>
                         <div>
                            <Label htmlFor="bpn">Bin Picking Number (BPN)</Label>
                            <Input id="bpn" placeholder="" {...register("bpn")}/>
                        </div>
                    </div>

                    {/* Right Div */}
                    <div className="space-y-12">
                        <div>
                            <Label htmlFor="mpn">Manufacturer Part Number (MPN)</Label>
                            <Input id="mpn" placeholder="" {...register("mpn")}/>
                        </div>

                        <div>
                            <Label htmlFor="gtin">Global Trade Item Number (GTIN)</Label>
                            <Input id="gtin" {...register("gtin")}/>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}