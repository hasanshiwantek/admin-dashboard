// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ProductIdentifiers() {
  const { register, watch, setValue } = useFormContext();

  const sku = watch("sku")

  return (
    <div
      id="productIdentifiers"
      className="p-10 bg-white shadow-lg rounded-sm scroll-mt-20"
    >
      <h1 className="2xl:!text-[2.4rem]">Product Identifiers</h1>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 my-4">
        {/* Left Div */}
        <div className="space-y-12">
          <div>
            <Label className="2xl:!text-2xl" htmlFor="sku">SKU</Label>
            <Input              className="!max-w-[100%] 2xl:!max-w-[90%] w-full" value={sku} placeholder="THX-1138" onChange={(e) => setValue("sku", e.target.value)} />
          </div>
          <div>
            <Label className="2xl:!text-2xl" htmlFor="upc">Product UPC/EAN</Label>
            <Input              className="!max-w-[100%] 2xl:!max-w-[90%] w-full" id="upc" placeholder="" {...register("upc")} />
          </div>
          <div>
            <Label className="2xl:!text-2xl" htmlFor="bpn">Bin Picking Number (BPN)</Label>
            <Input              className="!max-w-[100%] 2xl:!max-w-[90%] w-full" id="bpn" placeholder="" {...register("bpn")} />
          </div>
        </div>

        {/* Right Div */}
        <div className="space-y-12">
          <div>
            <Label className="2xl:!text-2xl" htmlFor="mpn">Manufacturer Part Number (MPN)</Label>
            <Input              className="!max-w-[100%] 2xl:!max-w-[90%] w-full" id="mpn" placeholder="" {...register("mpn")} />
          </div>

          <div>
            <Label className="2xl:!text-2xl" htmlFor="gtin">Global Trade Item Number (GTIN)</Label>
            <Input              className="!max-w-[100%] 2xl:!max-w-[90%] w-full" id="gtin" {...register("gtin")} />
          </div>
        </div>
      </div>
    </div>
  );
}
