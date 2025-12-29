import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./StoreSettings";

// 🆕 SearchSettings Component
export const SearchSettings = ({
  settings,
  onSettingsChange,
}: {
  settings: any;
  onSettingsChange: any;
}) => {
  const updateSetting = (key: any, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "best-selling", label: "Best Selling" },
    { value: "featured-items", label: "Featured Items" },
    { value: "newest-items", label: "Newest Items" },
  ];

  const contentSortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-6">Search Settings</h2>

        <FormField className="w-full lg:w-72" label="Default Product Sort">
          <Select
            value={settings.defaultProductSort}
            onValueChange={(value) =>
              updateSetting("defaultProductSort", value)
            }
          >
            <SelectTrigger className="!w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField className="w-full lg:w-72" label="Default Content Sort">
          <Select
            value={settings.defaultContentSort}
            onValueChange={(value) =>
              updateSetting("defaultContentSort", value)
            }
          >
            <SelectTrigger className="!w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {contentSortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField className="w-full lg:w-72" label="Storefront Search Logic">
          <Select
            value={settings.storefrontSearchLogic}
            onValueChange={(value) =>
              updateSetting("storefrontSearchLogic", value)
            }
          >
            <SelectTrigger className="!w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-or-more">
                Show results containing one or more
              </SelectItem>
              <SelectItem value="all-words">
                Show results containing all words
              </SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
    </div>
  );
};
