// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { generateSlug } from "@/const/data";
import { useAppSelector } from "@/hooks/useReduxHooks";

export default function Seo() {
  const { register, setValue, watch } = useFormContext();
  const productType = watch("productType");
  const [isUrlManuallyEdited, setIsUrlManuallyEdited] = useState<boolean>(false);
  const urlSettingData = useAppSelector(
    (state: any) => state.home?.urlSettingData
  );
  const { brands } = useAppSelector((state: any) => state.product);

  const brandId = watch("brandId");
  const watchedName = watch("name");
  const watchedSku = watch("sku");


  console.log('brandId', brandId, brands)

  useEffect(() => {
    if (!isUrlManuallyEdited) {
      if (urlSettingData?.format_type == "seo_optimized_short") {
        if (watchedName) {
          const slug = generateSlug(watchedName);
          setValue("productUrl", `/${slug}`);
        }
      } else if (urlSettingData?.format_type == "seo_optimized_long") {
        if (watchedName) {
          const slug = generateSlug(watchedName);
          setValue("productUrl", `/product/${slug}`);
        }
      }
      const formatType = urlSettingData?.format_type;
      const customFormat = urlSettingData?.custom_format;


      if (formatType === "custom" && customFormat) {
        if (brandId || watchedName || watchedSku) {
          let finalUrl = "";
          const brandName = brands?.data?.find(
            (item: any) => item?.brand?.id == brandId
          )?.brand?.name;

          finalUrl = customFormat
            .replace(/%name%/gi, generateSlug(watchedName))
            .replace(/%sku%/gi, watchedSku ? generateSlug(watchedSku) : "")
            .replace(/%brand%/gi, brandName ? generateSlug(brandName) : "")
            .replace(/%[^%]+%/g, "") // remove unknown placeholders
            .replace(/\/+/g, "/") // fix multiple slashes
            .replace(/^\/|\/$/g, ""); // remove starting/ending slash

          // console.log(finalUrl, brandName, brands?.data);
          if (finalUrl) {
            setValue("productUrl", finalUrl);
          }
        }
      }

    }
  }, [watchedName, watchedSku, isUrlManuallyEdited, brandId]);
  // console.log(watch("name"), watch("sku"), urlSettingData);


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
                  <TooltipContent >
                    Specify a page title, or leave blank to use the products
                    name as the page title.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input className="!max-w-[85%] w-full" id="pageTitle" placeholder="" {...register("pageTitle")} />
          </div>

          <div className="space-x-6">
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
                    your website. To change the URL, just click in the text box
                    and type in your changes. <br />
                    To change the default URL format, go to the settings - Store
                    Settings menu and click the URL Structure tab. click on the
                    reset button to return the URL to its default format.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              onKeyDown={(e) => {
                if (/[#$*&@!=+%`'"|]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                const pasted = e.clipboardData.getData("text");
                if (/[#$*&@!=+%`'"|]/.test(pasted)) {
                  e.preventDefault();
                }
              }}
              className="!max-w-[85%] w-full" id="ProductUrl" placeholder=""
              {...register("productUrl", {
                onChange: (e) => {
                  setIsUrlManuallyEdited(true);
                },
              })} />
            <button disabled={!watchedName} className="btn-outline-primary !py-2" type="button" onClick={() => {
              setIsUrlManuallyEdited(false)
              if (urlSettingData?.format_type == "seo_optimized_short") {
                if (watchedName) {
                  const slug = generateSlug(watchedName);
                  setValue("productUrl", `/${slug}`);
                }
              } else if (urlSettingData?.format_type == "seo_optimized_long") {
                if (watchedName) {
                  const slug = generateSlug(watchedName);
                  setValue("productUrl", `/product/${slug}`);
                }
              }
              const formatType = urlSettingData?.format_type;
              const customFormat = urlSettingData?.custom_format;


              if (formatType === "custom" && customFormat) {
                if (brandId || watchedName || watchedSku) {
                  let finalUrl = "";
                  const brandName = brands?.data?.find(
                    (item: any) => item?.brand?.id == brandId
                  )?.brand?.name;

                  finalUrl = customFormat
                    .replace(/%name%/gi, generateSlug(watchedName))
                    .replace(/%sku%/gi, watchedSku ? generateSlug(watchedSku) : "")
                    .replace(/%brand%/gi, brandName ? generateSlug(brandName) : "")
                    .replace(/%[^%]+%/g, "") // remove unknown placeholders
                    .replace(/\/+/g, "/") // fix multiple slashes
                    .replace(/^\/|\/$/g, ""); // remove starting/ending slash

                  // console.log(finalUrl, brandName, brands?.data);
                  if (finalUrl) {
                    setValue("productUrl", finalUrl);
                  }
                }
              }
            }}
            >Reset</button>
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
