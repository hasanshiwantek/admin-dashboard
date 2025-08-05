"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { addBrand } from "@/redux/slices/productSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useRouter } from "next/navigation";
const AddBrand = () => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    try {
      const resultAction = await dispatch(addBrand(formData));
      const result = (resultAction as any).payload;

      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        console.log("✅ Brand added successfully:", result);
        setName("");
        setTimeout(() => {
          router.push("/manage/products/brands");
        }, 2000);
      } else {
        console.error("❌ Failed to add brand:", result);
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
    }
  };

  return (
    <div>
      <div className="p-10 ">
        <div className="flex flex-col gap-6">
          <h1 className="!font-light">Add Brands</h1>
          <p>
            Brands can be associated with products, allowing your customers to
            shop by browsing their favorite brands. Add brands by typing them
            into the text box, one brand per line.{" "}
          </p>
        </div>
        <div className="bg-white p-5 shadow-md my-6">
          <h1>Brand Details</h1>
          <form onSubmit={handleSubmit} className="max-w-3xl p-6 space-y-6">
            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                Brand Name
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HiQuestionMarkCircle />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="font-semibold mb-1">Brand Names</div>
                      <div>
                        Type the brand names you want to add into the text box.
                        Enter one brand per line, such as:
                      </div>
                      <ul className="list-disc pl-5 mt-2">
                        <li>Nike</li>
                        <li>ADIDAS</li>
                        <li>Apple</li>
                        <li>Microsoft</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Textarea
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-6 flex justify-end gap-4 ">
        <Link href="/manage/products/brands">
          <button className="btn-outline-primary">Cancel</button>
        </Link>
        <button className="btn-primary" type="submit" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddBrand;
