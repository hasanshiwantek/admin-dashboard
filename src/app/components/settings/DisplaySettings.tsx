"use client";

import CheckboxField from "@/components/form/fields/CheckboxField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import { Info } from "lucide-react";
import {
  BREADCRUMB_OPTIONS,
  CATEGORY_PRODUCT_LIST_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DisplayField,
  PRICE_DISPLAY_OPTIONS,
} from "./constant";

export const DisplaySettings = ({ control }: any) => {
  return (
    <div className="space-y-8">
      {/* Display Settings */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="mb-6 !font-semibold 2xl:!text-[2.4rem]">
          Display Settings
        </h2>

        <div className="space-y-4">
          <InputField
            name={`display.${DisplayField.ProductBreadcrumbs}`}
            label="Product Breadcrumbs"
            Component={SelectField}
            control={control}
            options={BREADCRUMB_OPTIONS}
            className="w-full "
            controlClassName="max-w-md"
          />

          <InputField
            name={`display.${DisplayField.ShowQuantityBox}`}
            label="Show Quantity Box for Products"
            Component={CheckboxField}
            control={control}
            text="Yes, show the quantity box on the add to cart panel"
            className="w-full "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.EnableSearchSuggest}`}
            label="Enable Search Suggest"
            Component={CheckboxField}
            control={control}
            text="Yes, enable search suggest"
            className="w-full "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.AutoApproveReviews}`}
            label="Auto Approve Reviews"
            Component={CheckboxField}
            control={control}
            text="Yes, auto approve reviews"
            className="w-full "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.EnableWishlist}`}
            label="Enable Wishlist"
            Component={CheckboxField}
            control={control}
            text="Yes, enable the wishlist for my store"
            className="w-full "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.EnableProductComparisons}`}
            label="Enable Product Comparisons"
            Component={CheckboxField}
            control={control}
            text="Yes, enable product comparisons"
            className="w-full "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.EnableAccountCreation}`}
            label="Enable Account Creation?"
            Component={CheckboxField}
            control={control}
            text="Yes, enable account creation in my store"
            className="w-full "
            controlClassName="max-w-xl"
          />
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-6 2xl:!text-[2.4rem]">Control Panel</h2>

        <div className="space-y-4">
          <InputField
            name={`display.${DisplayField.UseWysiwygEditor}`}
            label="Use WYSIWYG Editor"
            Component={CheckboxField}
            control={control}
            text="Yes, enable the WYSIWYG editor"
            className="w-full "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.ShowProductThumbnails}`}
            label="Show Product Thumbnails"
            Component={CheckboxField}
            control={control}
            text="Yes, show product thumbnail images"
            className="w-full "
            controlClassName="max-w-xl"
          />
        </div>
      </div>

      {/* Category Settings */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-4 2xl:!text-[2.4rem]">
          Category Settings
        </h2>

        <div className="space-y-4">
          <InputField
            name={`display.${DisplayField.CategoryProductList}`}
            label="Category Product List"
            Component={RadioGroupField}
            control={control}
            options={CATEGORY_PRODUCT_LIST_OPTIONS}
            className="w-full "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.DefaultProductSort}`}
            label="Default Product Sort"
            Component={SelectField}
            control={control}
            options={DEFAULT_SORT_OPTIONS}
            className="w-full "
          />

          <div className="flex flex-col lg:flex-row items-start gap-4">
            <label className="w-full lg:w-72  text-right pr-4 pt-2 font-medium 2xl:!text-2xl">
              Menu Display Depth
            </label>
            <div className="flex items-center gap-2">
              <InputField
                name={`display.${DisplayField.MenuDisplayDepth}`}
                control={control}
                type="number"
                min={1}
                label=""
                className="w-20"
              />
              <span className="text-sm text-gray-700 2xl:!text-2xl">
                levels deep
              </span>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Settings */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-4 2xl:!text-[2.4rem]">
          Product Settings
        </h2>

        <div className="space-y-4">
          <InputField
            name={`display.${DisplayField.ShowProductPrice}`}
            label="Show Product's Price?"
            Component={CheckboxField}
            control={control}
            text="Yes, show the product's price in my store"
            className="w-full  "
            controlClassName="max-w-xl"
          />

          <div className="flex flex-col lg:flex-row items-start gap-4">
            <label className="w-full lg:w-96 text-right pr-4 pt-2 font-medium 2xl:!text-2xl">
              Price to display on the product details page when product selections don't map to a price
            </label>
            <div className="flex items-center gap-2 flex-1">
              <InputField
                name={`display.${DisplayField.DetailPageDefaultPrice}`}
                Component={SelectField}
                control={control}
                options={PRICE_DISPLAY_OPTIONS}
                label=""
                className="w-56"
              />
              <a href="#" className="text-blue-600 hover:underline text-sm whitespace-nowrap">
                Learn more
              </a>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-4">
            <label className="w-full lg:w-96 text-right pr-4 pt-2 font-medium 2xl:!text-2xl">
              Price to display on the product list page when unselected options don't map to a price
            </label>
            <div className="flex items-center gap-2 flex-1">
              <InputField
                name={`display.${DisplayField.ListPageDefaultPrice}`}
                Component={SelectField}
                control={control}
                options={PRICE_DISPLAY_OPTIONS}
                label=""
                className="w-56"
              />
              <a href="#" className="text-blue-600 hover:underline text-sm whitespace-nowrap">
                Learn more
              </a>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <InputField
            name={`display.${DisplayField.HidePriceFromGuests}`}
            label="Hide Product's Price from Guests?"
            Component={CheckboxField}
            control={control}
            text="Yes, only show the product's price to logged in customers"
            className="w-full  "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.ShowProductSku}`}
            label="Show Product's SKU?"
            Component={CheckboxField}
            control={control}
            text="Yes, show the product's SKU in my store"
            className="w-full  "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.ShowProductWeight}`}
            label="Show Product's Weight?"
            Component={CheckboxField}
            control={control}
            text="Yes, show the product's weight in my store"
            className="w-full  "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.ShowProductBrand}`}
            label="Show Product's Brand?"
            Component={CheckboxField}
            control={control}
            text="Yes, show the product's brand in my store"
            className="w-full  "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.ShowProductShippingCost}`}
            label="Show Product's Shipping Cost?"
            Component={CheckboxField}
            control={control}
            text="Yes, show the product's shipping cost in my store"
            className="w-full  "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.ShowProductRating}`}
            label="Show Product's Rating?"
            Component={CheckboxField}
            control={control}
            text="Yes, show the product's rating in my store"
            className="w-full "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.ShowAddToCartLink}`}
            label="Show Add to Cart Link?"
            Component={CheckboxField}
            control={control}
            text='Yes, show the "Add to Cart" link in all the small product boxes'
            className="w-full "
            controlClassName="max-w-xl"
          />

          <InputField
            name={`display.${DisplayField.DefaultPreOrderMessage}`}
            label="Default Pre-Order Message"
            control={control}
            className="w-full "
          />
        </div>
      </div>
    </div>
  );
};