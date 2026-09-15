// BasicInfoForm.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ValidationError } from "@/components/ui/validation-error";
import { wholeNumberValidation } from "@/validations/validations";
import { useFormContext } from "react-hook-form";
import { HiQuestionMarkCircle } from "react-icons/hi2";

export default function Dimensions() {
  const { register, formState } = useFormContext<any>();
  const getDimensionError = (field: string) =>
    (formState.errors as any)?.dimensions?.[field]?.message;

  return (
    <section id="dimensionWeight" className="space-y-4 scroll-mt-20">
      <div className="flex justify-center items-center flex-col">
        <h1 className="2xl:!text-[2.4rem]">Fulfillment</h1>
        <p className="text-muted-foreground 2xl:!text-2xl">
          Setup shipping and inventory details for this product.
        </p>
      </div>
      <div className="p-10 bg-white shadow-lg rounded-sm ">
        <h1 className="2xl:!text-[2.4rem]">Dimensions & Weight</h1>
        <p className="text-muted-foreground 2xl:!text-2xl">
          Enter the dimensions and weight of this product to help calculate
          shipping rate. These measurements are for the product's shipping
          container. They are used to help calculate shipping price and do not
          show up on your storefront.
        </p>
        <div className="grid grid-col-1 2xl:grid-cols-2 gap-6 my-4">
          {/* Left Div */}
          <div className="space-y-12">
            <div>
              <Label className="2xl:!text-2xl" htmlFor="dimensions.weight">
                Weight (LBS) <span className="!text-red-500">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HiQuestionMarkCircle />
                      {/* <HiMiniQuestionMarkCircle /> */}
                    </TooltipTrigger>
                    <TooltipContent>
                      Specify a page title, or leave blank to use the products
                      name as the page title.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                type="number"
                className="!max-w-[90%] w-full"
                placeholder="0"
                {...register("dimensions.weight" as any, {
                  ...wholeNumberValidation("Weight"),
                  required: "Weight is required",
                })}
              />
              <ValidationError message={getDimensionError("weight")} />
            </div>
            <div>
              <Label className="2xl:!text-2xl" htmlFor="dimensions.height">
                Height (Inches)
                <span className="!text-red-500">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HiQuestionMarkCircle />
                      {/* <HiMiniQuestionMarkCircle /> */}
                    </TooltipTrigger>
                    <TooltipContent>
                      Specify a page title, or leave blank to use the products
                      name as the page title.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                type="number"
                className="!max-w-[90%] w-full"
                id="height"
                {...register(
                  "dimensions.height" as any,
                  wholeNumberValidation("Height"),
                )}
              />
              <ValidationError message={getDimensionError("height")} />
            </div>
          </div>

          {/* Right Div */}
          <div className="space-y-12">
            <div>
              <Label className="2xl:!text-2xl" htmlFor="dimensions.width">
                Width (Inches)
                <span className="!text-red-500">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HiQuestionMarkCircle />
                      {/* <HiMiniQuestionMarkCircle /> */}
                    </TooltipTrigger>
                    <TooltipContent>
                      Specify a page title, or leave blank to use the products
                      name as the page title.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                type="number"
                className="!max-w-[90%] w-full"
                id="width"
                placeholder=""
                {...register(
                  "dimensions.width" as any,
                  wholeNumberValidation("Width"),
                )}
              />
              <ValidationError message={getDimensionError("width")} />
            </div>

            <div>
              <Label className="2xl:!text-2xl" htmlFor="dimensions.depth">
                Depth (Inches)
                <span className="!text-red-500">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HiQuestionMarkCircle />
                      {/* <HiMiniQuestionMarkCircle /> */}
                    </TooltipTrigger>
                    <TooltipContent>
                      Specify a page title, or leave blank to use the products
                      name as the page title.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                type="number"
                className="!max-w-[90%] w-full"
                id="depth"
                {...register(
                  "dimensions.depth" as any,
                  wholeNumberValidation("Depth"),
                )}
              />
              <ValidationError message={getDimensionError("depth")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
