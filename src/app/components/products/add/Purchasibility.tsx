"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ValidationError } from "@/components/ui/validation-error";
import {
  normalizeWholeNumberValue,
  restrictWholeNumberInput,
  restrictWholeNumberPaste,
  wholeNumberValidation,
} from "@/validations/validations";
import { Controller, useFormContext } from "react-hook-form";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
export default function Purchasability() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const status = watch("purchasabilityStatus");
  const callForPricing = watch("callForPricing");
  const removePreorderDate = watch("removePreorderStatus");

  return (
    <div
      className="bg-white p-6 border rounded-md space-y-6 scroll-mt-20"
      id="purchasability"
    >
      <h1 className="2xl:!text-[2.4rem]">Purchasability</h1>

      {/* Radio Group with Controller */}
      <Controller
        name="purchasabilityStatus"
        control={control}
        defaultValue="available"
        render={({ field }) => (
          <RadioGroup
            ref={field.ref}
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
            className="space-y-4"
          >
            <div className="flex items-start gap-2">
              <RadioGroupItem value="available" id="available" />
              <Label className="2xl:!text-2xl" htmlFor="available">
                This product can be purchased in my online store
              </Label>
            </div>

            {/* <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <RadioGroupItem value="preorder" id="preorder" />
                <Label className="2xl:!text-2xl" htmlFor="preorder">
                  This product is coming soon but I want to take pre-orders
                </Label>
              </div>

              {field.value === "preorder" && (
                <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4 ml-6">
                  <div>
                    <Label
                      className="mb-1 2xl:!text-2xl"
                      htmlFor="preorderMessage"
                    >
                      Message
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HiQuestionMarkCircle className="w-6 h-6" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <strong>Pre-Order Message?</strong>
                            <br />
                            The message to be shown in your store when a release
                            date is specified for this pre-order product. You
                            can also set a store-wide default message via the
                            Settings section of the control panel. Leave this
                            message blank to reset it back to the store-wide
                            default. To place the product's release date into
                            the message, use the %%DATE%% placeholder.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      placeholder="Expected release date is"
                      {...register("preorderMessage")}
                      id="preorderMessage"
                    />
                  </div>
                  <div className="mt-1">
                    <Label className="mb-1 block 2xl:!text-2xl">
                      Release Date
                    </Label>
                    <Controller
                      name="releaseDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          date={field.value}
                          onChange={field.onChange}
                          placeholder="MMM DD, YYYY"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Label className="mb-1 2xl:!text-2xl" htmlFor="preOrder">
                      Remove pre-order status on this date
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HiQuestionMarkCircle className="w-6 h-6" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <strong>
                              Remove pre-order status on this date?
                            </strong>
                            <br />
                            If you know when you will receive stock for this
                            product, or you know it's release date then select
                            it here. The release date will appear under the
                            'Pre-order: Add to Cart' button, like this :<br />
                            <strong>
                              Expected release date: 6th April 2013
                            </strong>
                            <br />
                            If you'd like to have the pre-order status removed
                            automatically for this product on the release date
                            then tick the checkbox. On the release date the
                            product will automatically appear as a regular
                            product in your store and the release date label and
                            pre-order text on the Add to Cart will be gone.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Controller
                      name="removePreorderStatus"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Switch
                          id="preOrder"
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      )}
                    />
                  </div>
                </div>
              )}
            </div> */}

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <RadioGroupItem value="notAvailable" id="notAvailable" />
                <Label className="2xl:!text-2xl" htmlFor="notAvailable">
                  This product cannot be purchased in my online store
                </Label>
              </div>
            </div>
          </RadioGroup>
        )}
      />

      {/* Kept outside the RadioGroup so typing does not bubble into its field handlers */}
      {status === "notAvailable" && (
        <div className="space-y-5 mt-2">
          <div className="flex items-center gap-4">
            <Controller
              name="callForPricing"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  id="callForPricing"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />
            <Label className="2xl:!text-2xl" htmlFor="callForPricing">
              Show “Call for pricing” message instead of the price
            </Label>
          </div>

          {callForPricing && (
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
              <div>
                <Label
                  className="2xl:!text-2xl"
                  htmlFor="callForPricingLabel"
                >
                  Call for pricing label
                </Label>

                <Input
                  id="callForPricingLabel"
                  className="max-w-[90%]! w-full"
                  placeholder="Contact us"
                  {...register("callForPricingLabel")}
                />
              </div>

              <div>
                <Label
                  className="2xl:!text-2xl"
                  htmlFor="callForPricingPhone"
                >
                  Call for pricing phone
                </Label>

                {/* <Input
                  id="callForPricingPhone"
                  className="max-w-[90%]! w-full"
                  placeholder="032656787656"
                  {...register("callForPricingPhone")}
                /> */}
               <Controller
  name="callForPricingPhone"
  control={control}
  defaultValue=""
  rules={{
    required: "Phone number is required",
  }}
  render={({ field }) => (
    <div>
      <div
        className="
          flex
          h-10
          w-full
          max-w-[90%]
          items-center
          rounded-md
          border            
          border-input
          bg-background
          px-3
          transition
          focus-within:border-ring
          focus-within:ring-2
          focus-within:ring-ring/20
          2xl:h-14
        "
      >
        <PhoneInput
          international
          defaultCountry="PK"
          value={field.value}
          onChange={field.onChange}
          placeholder="Enter phone number"
          className="flex w-full items-center"
          numberInputProps={{
            className:
              "w-full border-0 bg-transparent px-2 text-sm outline-none focus:ring-0 2xl:text-xl",
          }}
        />
      </div>

      <ValidationError
        message={errors.callForPricingPhone?.message}
      />
    </div>
  )}
/>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Min/Max Purchase Quantity */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 pt-6">
        <div>
          <Label className="2xl:!text-2xl" htmlFor="minPurchaseQty">
            Minimum Purchase Quantity
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HiQuestionMarkCircle className="w-6 h-6" />
                </TooltipTrigger>
                <TooltipContent>
                  Setting this to a positive integer will enforce a minimum
                  quantity limit when customers are ordering this product from
                  your store.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            className="!max-w-[90%] w-full"
            id="minPurchaseQty"
            {...register("minPurchaseQuantity", {
              ...wholeNumberValidation("Minimum Purchase Quantity"),
              max: {
                value: 999999999,
                message: "Quantity must be less than 1,000,000,000",
              },
            })}
            type="number"
            onKeyDown={restrictWholeNumberInput}
            onPaste={restrictWholeNumberPaste}
            onInput={normalizeWholeNumberValue}
          />
          <ValidationError message={errors.minPurchaseQuantity?.message} />
        </div>
        <div>
          <Label className="2xl:!text-2xl" htmlFor="maxPurchaseQty">
            Maximum Purchase Quantity
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HiQuestionMarkCircle className="w-6 h-6" />
                </TooltipTrigger>
                <TooltipContent>
                  Setting this to a positive integer will enforce a maximum
                  quantity limit when customers are ordering this product from
                  your store.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            className="!max-w-[90%] w-full"
            id="maxPurchaseQty"
            {...register("maxPurchaseQuantity", {
              ...wholeNumberValidation("Maximum Purchase Quantity"),
              max: {
                value: 999999999,
                message: "Quantity must be less than 1,000,000,000",
              },
            })}
            type="number"
            onKeyDown={restrictWholeNumberInput}
            onPaste={restrictWholeNumberPaste}
            onInput={normalizeWholeNumberValue}
          />
          <ValidationError message={errors.maxPurchaseQuantity?.message} />
        </div>
      </div>
    </div>
  );
}
