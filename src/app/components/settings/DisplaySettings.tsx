import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./StoreSettings";
import { Textarea } from "@/components/ui/textarea";
import { CheckboxField } from "./StoreSettings";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RadioField } from "./StoreSettings";
import { Info } from "lucide-react";
// 🆕 DisplaySettings Component
export const DisplaySettings = ({
  settings,
  onSettingsChange,
}: {
  settings: any;
  onSettingsChange: any;
}) => {
  const updateSetting = (key: any, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-8">
      {/* Display Settings Section */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="mb-6 !font-semibold 2xl:!text-[2.4rem]">Display Settings</h2>

        <FormField className="w-full lg:w-96" label="Product Breadcrumbs">
          <Select
            value={settings.productBreadcrumbs}
            onValueChange={(value) =>
              updateSetting("productBreadcrumbs", value)
            }
          >
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="show-one-only">Show One Only</SelectItem>
              <SelectItem value="hide">Dont Show</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <CheckboxField
          className="w-full lg:w-96"
          label="Show Quantity Box for Products"
          checked={settings.showQuantityBox}
          onCheckedChange={(checked) =>
            updateSetting("showQuantityBox", checked)
          }
          infoText="Yes, show the quantity box on the add to cart panel"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Enable Search Suggest"
          checked={settings.enableSearchSuggest}
          onCheckedChange={(checked) =>
            updateSetting("enableSearchSuggest", checked)
          }
          infoText="Yes, enable search suggest"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Auto Approve Reviews"
          checked={settings.autoApproveReviews}
          onCheckedChange={(checked) =>
            updateSetting("autoApproveReviews", checked)
          }
          infoText="Yes, auto approve reviews"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Enable Wishlist"
          checked={settings.enableWishlist}
          onCheckedChange={(checked) =>
            updateSetting("enableWishlist", checked)
          }
          infoText="Yes, enable the wishlist for my store"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Enable Product Comparisons"
          checked={settings.enableProductComparisons}
          onCheckedChange={(checked) =>
            updateSetting("enableProductComparisons", checked)
          }
          infoText="Yes, enable product comparisons"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Enable Account Creation?"
          checked={settings.enableAccountCreation}
          onCheckedChange={(checked) =>
            updateSetting("enableAccountCreation", checked)
          }
          infoText="Yes, enable account creation in my store"
        />
      </div>

      {/* Control Panel Section */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-6 2xl:!text-[2.4rem]">Control Panel</h2>

        <CheckboxField
          className="w-full lg:w-96"
          label="Use WYSIWYG Editor"
          checked={settings.useWysiwygEditor}
          onCheckedChange={(checked) =>
            updateSetting("useWysiwygEditor", checked)
          }
          infoText="Yes, enable the WYSIWYG editor"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Show Product Thumbnails"
          checked={settings.showProductThumbnails}
          onCheckedChange={(checked) =>
            updateSetting("showProductThumbnails", checked)
          }
          infoText="Yes, show product thumbnail images"
        />
      </div>

      {/* Category Settings Section (Only the heading from the image) */}
      {/* 3. Category Settings Section (From image_a207e8.png) */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-4 2xl:!text-[2.4rem]">Category Settings</h2>

        <RadioField
          className="w-full lg:w-96"
          label="Category Product List"
          value={settings.categoryProductList}
          onValueChange={(value) => updateSetting("categoryProductList", value)}
          options={[
            {
              value: "current-only",
              label: "Show products from the current category only",
            },
            {
              value: "children-if-empty",
              label:
                "Show products from child categories if the current category is empty",
            },
            {
              value: "current-and-children",
              label: "Show products from the current category and its children",
            },
          ]}
        />

        <FormField className="w-full lg:w-96" label="Default Product Sort">
          <Select
            value={settings.defaultProductSort}
            onValueChange={(value) =>
              updateSetting("defaultProductSort", value)
            }
          >
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured Items</SelectItem>
              <SelectItem value="newest-items">Newest Items</SelectItem>
              <SelectItem value="best-selling">Best Selling</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">A to Z</SelectItem>
              <SelectItem value="name-desc">Z to A</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField className="w-full lg:w-96" label="Menu Display Depth" hasInfo={true}>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              value={settings.menuDisplayDepth}
              onChange={(e) =>
                updateSetting("menuDisplayDepth", e.target.value)
              }
              className="w-20"
            />
            <span className="text-gray-500 text-sm">levels deep</span>
          </div>
        </FormField>
      </div>

      {/* 4. Product Settings Section (From image_a207e8.png) */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-4 2xl:!text-[2.4rem]">Product Settings</h2>

        <CheckboxField
          className="w-full lg:w-96"
          label="Show Product's Price?"
          checked={settings.showProductPrice}
          onCheckedChange={(checked) =>
            updateSetting("showProductPrice", checked)
          }
          infoText="Yes, show the product's price in my store"
        />

        {/* Price Display on Detail Page */}
        <div className="flex flex-col lg:flex-row items-start gap-4 py-3">
          <Label className="w-full lg:w-96 flex justify-start lg:justify-end pt-2 2xl:!text-2xl">
            Price to display on the product details page when product selections
            don't map to a price
          </Label>
          <div className="flex-1 flex items-center gap-2">
            <Select
              value={settings.detailPageDefaultPrice}
              onValueChange={(value) =>
                updateSetting("detailPageDefaultPrice", value)
              }
            >
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default-catalog">
                  Default catalog price
                </SelectItem>
                <SelectItem value="lowest-variation">
                  Lowest variation price
                </SelectItem>
              </SelectContent>
            </Select>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Learn more
            </a>
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
        </div>

        {/* Price Display on List Page */}
        <div className="flex flex-col lg:flex-row items-start gap-4 py-3">
          <Label className="w-full lg:w-96 flex justify-start lg:justify-end pt-2 2xl:!text-2xl">
            Price to display on the product list page when unselected options
            don't map to a price
          </Label>
          <div className="flex-1 flex items-center gap-2">
            <Select
              value={settings.listPageDefaultPrice}
              onValueChange={(value) =>
                updateSetting("listPageDefaultPrice", value)
              }
            >
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default-catalog">
                  Default catalog price
                </SelectItem>
                <SelectItem value="lowest-variation">
                  Lowest variation price
                </SelectItem>
              </SelectContent>
            </Select>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Learn more
            </a>
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
        </div>

        <CheckboxField 
          className="w-full lg:w-96"
          label="Hide Product's Price from Guests?"
          checked={settings.hidePriceFromGuests}
          onCheckedChange={(checked) =>
            updateSetting("hidePriceFromGuests", checked)
          }
          infoText="Yes, only show the product's price to logged in customers"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Show Product's SKU?"
          checked={settings.showProductSku}
          onCheckedChange={(checked) =>
            updateSetting("showProductSku", checked)
          }
          infoText="Yes, show the product's SKU in my store"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Show Product's Weight?"
          checked={settings.showProductWeight}
          onCheckedChange={(checked) =>
            updateSetting("showProductWeight", checked)
          }
          infoText="Yes, show the product's weight in my store"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Show Product's Brand?"
          checked={settings.showProductBrand}
          onCheckedChange={(checked) =>
            updateSetting("showProductBrand", checked)
          }
          infoText="Yes, show the product's brand in my store"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Show Product's Shipping Cost?"
          checked={settings.showProductShippingCost}
          onCheckedChange={(checked) =>
            updateSetting("showProductShippingCost", checked)
          }
          infoText="Yes, show the product's shipping cost in my store"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Show Product's Rating?"
          checked={settings.showProductRating}
          onCheckedChange={(checked) =>
            updateSetting("showProductRating", checked)
          }
          infoText="Yes, show the product's rating in my store"
        />

        <CheckboxField
          className="w-full lg:w-96"
          label="Show Add to Cart Link?"
          checked={settings.showAddToCartLink}
          onCheckedChange={(checked) =>
            updateSetting("showAddToCartLink", checked)
          }
          infoText="Yes, show the “Add to Cart” link in all the small product boxes"
        />

        <FormField className="w-full lg:w-96" label="Default Pre-Order Message">
          <Input
            value={settings.defaultPreOrderMessage}
            onChange={(e) =>
              updateSetting("defaultPreOrderMessage", e.target.value)
            }
            className="w-64"
          />
        </FormField>
      </div>
    </div>
  );
};
