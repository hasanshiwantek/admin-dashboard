"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";

const StoreFront = () => {
  const { register, control } = useFormContext();

  return (
    <div>
      <div className="flex justify-center items-center flex-col my-5" id="storefrontDetails">
        <h1>Storefront</h1>
        <p className="text-muted-foreground">
          Setup what customers will see on the storefront.
        </p>
      </div>
      <div className="bg-white p-10 shadow-md space-y-8 ">
        <h1>Storefront Details</h1>
        <div className="space-y-6">
          {/* Featured Checkbox */}
          <div className="flex items-center space-x-5">
            <Controller
              control={control}
              name="isFeatured"
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  id="isFeatured"
                  checked={field.value}
                  onCheckedChange={(val) => field.onChange(val === true)}
                />
              )}
            />
            <Label htmlFor="isFeatured">
              Set as a Featured Product on my Storefront
            </Label>
            <Tooltip>
              <TooltipTrigger>
                <HiQuestionMarkCircle className="w-6 h-6 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                If checked, this product will be shown as featured in various
                places on your site, including the front page.
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Search Keywords */}

          <div className="space-y-4">
            <Label htmlFor="searchKeywords">
              Search Keywords
              <Tooltip>
                <TooltipTrigger>
                  <HiQuestionMarkCircle className="w-6 h-6 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <strong>Search Keywords</strong>
                  <br />
                  The search keywords are optional, but if entered will be used
                  to assist people when searching your products using on-site
                  search. Enter keywords separated by commas, such as: widget,
                  affordable, portable.
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="searchKeywords"
              placeholder="e.g. Widget, affordable, portable, etc..."
              {...register("searchKeywords")}
              className="max-w-full"
            />
          </div>

          {/* Sort Order and Template Layout File */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label htmlFor="sortOrder">
                Sort Order
                <Tooltip>
                  <TooltipTrigger>
                    <HiQuestionMarkCircle className="w-6 h-6 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Product sort order defaults to 0. Enter a low number (such
                    as -1) to move it to the top, or a high number (such as 20)
                    to move it to the bottom.
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="sortOrder"
                type="number"
                defaultValue={0}
                {...register("sortOrder", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="templateLayout">
                Template Layout File
                <Tooltip>
                  <TooltipTrigger>
                    <HiQuestionMarkCircle className="w-6 h-6 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Advanced users can create an alternate template layout file
                    to use instead of the default one for this product.
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Controller
                name="templateLayout"
                control={control}
                defaultValue="default"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">default</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Warranty Information */}
          <div className="space-y-4">
            <Label htmlFor="warranty">
              Warranty Information
              <Tooltip>
                <TooltipTrigger>
                  <HiQuestionMarkCircle className="w-6 h-6 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  If you do not offer a warranty or are unsure, check the
                  manufacturers web site for details.
                </TooltipContent>
              </Tooltip>
            </Label>
            <Textarea
              id="warranty"
              rows={6} // typical row height
              className="w-full md:h-[100px]" // full width on small screens, fixed width on md+
              {...register("warranty")}
            />
          </div>

          {/* Availability Text */}
          <div className="space-y-4">
            <Label htmlFor="availabilityText">
              Availability Text
              <Tooltip>
                <TooltipTrigger>
                  <HiQuestionMarkCircle className="w-6 h-6 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  A few words telling the customer how long it will normally
                  take to ship this product.
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="availabilityText"
              placeholder="Usually ships in 24 hours."
              {...register("availabilityText")}
            />
          </div>

          {/* Condition + Checkbox */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <Label htmlFor="condition">
                Condition
                <Tooltip>
                  <TooltipTrigger>
                    <HiQuestionMarkCircle className="w-6 h-6 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <strong> Product Condition </strong> <br /> The condition of
                    a product is often used for marketing feeds such as Google
                    Shopping."
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Controller
                name="condition"
                control={control}
                defaultValue="new"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="refurbished">Refurbished</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Controller
                control={control}
                name="showCondition"
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    id="showCondition"
                    checked={field.value}
                    onCheckedChange={(val) => field.onChange(val === true)}
                  />
                )}
              />
              <Label htmlFor="showCondition">
                Show condition on storefront
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreFront;
