// BasicInfoForm.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/hooks/useReduxHooks";
import {
  generateDuplicateProductUrl,
  generateFormattedProductUrl,
  normalizeProductUrl,
} from "@/lib/productUtils";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { HiQuestionMarkCircle } from "react-icons/hi2";

export default function Seo({ hasDuplicate }: { hasDuplicate: boolean }) {
  const { register, setValue, watch } = useFormContext();
  const { id } = useParams();
  const [isUrlManuallyEdited, setIsUrlManuallyEdited] =
    useState<boolean>(false);
  const [showRedirectCheckbox, setShowRedirectCheckbox] =
    useState<boolean>(false);
  const initialDuplicateUrlRef = useRef<string>("");
  const [productUrlValue, isRedirectValue, brandId, watchedName, watchedSku] = [
    watch("productUrl"),
    watch("isRedirect"),
    watch("brandId"),
    watch("name"),
    watch("sku"),
  ];

  const urlSettingData = useAppSelector(
    (state: any) => state.home?.urlSettingData,
  );
  const { brands } = useAppSelector((state: any) => state.product);
  const brandName = brands?.data?.find(
    (item: any) => item?.brand?.id == brandId,
  )?.brand?.name;

  useEffect(() => {
    if (id) {
      setIsUrlManuallyEdited(true);
    }
  }, [id]);

  useEffect(() => {
    setValue("pageTitle", watchedName || "");
  }, [setValue, watchedName]);

  useEffect(() => {
    if (productUrlValue && !initialDuplicateUrlRef.current) {
      initialDuplicateUrlRef.current = productUrlValue;
    }

    if (!initialDuplicateUrlRef.current) {
      return;
    }

    const hasManualRedirectChange =
      isUrlManuallyEdited && productUrlValue !== initialDuplicateUrlRef.current;

    setShowRedirectCheckbox(hasManualRedirectChange);
  }, [isUrlManuallyEdited, productUrlValue]);

  useEffect(() => {
    if (isUrlManuallyEdited || hasDuplicate) return;

    const productUrl = generateFormattedProductUrl({
      formatType: urlSettingData?.format_type,
      customFormat: urlSettingData?.custom_format,
      name: watchedName,
      sku: watchedSku,
      brand: brandName,
    });

    if (productUrl) {
      setValue("productUrl", normalizeProductUrl(productUrl));
    }
  }, [
    watchedName,
    watchedSku,
    brandName,
    isUrlManuallyEdited,
    urlSettingData?.format_type,
    urlSettingData?.custom_format,
  ]);

  const handleResetProductUrl = () => {
    setIsUrlManuallyEdited(false);

    if (hasDuplicate) {
      const duplicateUrl = generateDuplicateProductUrl(watchedName || "copy");
      setValue("productUrl", normalizeProductUrl(duplicateUrl));
      return;
    }

    const productUrl = generateFormattedProductUrl({
      formatType: urlSettingData?.format_type,
      customFormat: urlSettingData?.custom_format,
      name: watchedName,
      sku: watchedSku,
      brand: brandName,
    });

    if (productUrl) {
      setValue("productUrl", normalizeProductUrl(productUrl));
    }
  };

  return (
    <section id="seo" className="space-y-4 scroll-mt-20">
      <div className="flex justify-center items-center flex-col my-5">
        <h1 className="2xl:!text-[2.4rem]">SEO & Sharing</h1>
        <p className="2xl:!text-2xl">Boost traffic to your online business.</p>
      </div>
      <div className="p-10 bg-white shadow-lg rounded-sm ">
        <h1 className="2xl:!text-[2.4rem]">Search Engine Optimization</h1>
        <div className="grid grid-cols-1 2xl:grid-cols-2 items-center gap-6 my-4">
          <div>
            <Label className="2xl:!text-2xl" htmlFor="pageTitle">
              Page Title
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
              className="!max-w-[85%] w-full"
              id="pageTitle"
              placeholder=""
              {...register("pageTitle")}
            />
          </div>

          <div className="space-x-6">
            <div>
              <Label className="2xl:!text-2xl" htmlFor="productUrl">
                Product URL <span className="!text-red-500">*</span>{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HiQuestionMarkCircle />
                      {/* <HiMiniQuestionMarkCircle /> */}
                    </TooltipTrigger>
                    <TooltipContent>
                      The URL shown here is how people can access the product on
                      your website. To change the URL, just click in the text
                      box and type in your changes. <br />
                      To change the default URL format, go to the settings -
                      Store Settings menu and click the URL Structure tab. click
                      on the reset button to return the URL to its default
                      format.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                onKeyDown={(e) => {
                  if (/[#$*&@!=+%`'":;<>{}[]|]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const pasted = e.clipboardData.getData("text");
                  if (/[#$*&@!=+%`'":;<>{}[]|]/.test(pasted)) {
                    e.preventDefault();
                  }
                }}
                required
                className="!max-w-[85%] w-full"
                id="ProductUrl"
                placeholder=""
                {...register("productUrl", {
                  onChange: (e) => {
                    setIsUrlManuallyEdited(true);
                  },
                })}
              />
              <button
                className="btn-outline-primary"
                type="button"
                onClick={handleResetProductUrl}
              >
                Reset
              </button>
            </div>
            {showRedirectCheckbox && (
              <div className="mt-3 flex items-center gap-3 pl-1">
                <Checkbox
                  id="isRedirect"
                  checked={!!isRedirectValue}
                  onCheckedChange={(checked) =>
                    setValue("isRedirect", checked === true)
                  }
                />
                <Label
                  htmlFor="isRedirect"
                  className="2xl:!text-xl cursor-pointer text-sm font-medium text-gray-700"
                >
                  Redirect old URLs to this URL automatically (recommended)
                </Label>
              </div>
            )}
          </div>
        </div>

        <div>
          <Label className="2xl:!text-2xl" htmlFor="metaDescription">
            Meta Description{" "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HiQuestionMarkCircle />
                  {/* <HiMiniQuestionMarkCircle /> */}
                </TooltipTrigger>
                <TooltipContent>
                  Specify the description that will appear in the relevant meta
                  tag for this product.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            className="!max-w-[85%] 2xl:!max-w-[100%] w-full"
            id="metaDescription"
            placeholder=""
            {...register("metaDescription")}
            // className="!min-w-[75rem]"
          />
        </div>
      </div>
    </section>
  );
}
