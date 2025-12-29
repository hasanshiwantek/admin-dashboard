

import React, { useState } from "react";
import { Search, ChevronRight, ArrowLeft, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./StoreSettings";
import { Textarea } from "@/components/ui/textarea";

// WebsiteSettings Component
export const WebsiteSettings = ({
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
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="mb-6 !font-semibold 2xl:!text-[2.4rem]">Physical Dimension Settings</h2>

        <FormField label="Weight Measurement">
          <Select
            value={settings.weightMeasurement}
            onValueChange={(value) => updateSetting("weightMeasurement", value)}
          >
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pounds">Pounds</SelectItem>
              <SelectItem value="kilograms">Kilograms</SelectItem>
              <SelectItem value="ounces">Ounces</SelectItem>
              <SelectItem value="grams">Grams</SelectItem>
              <SelectItem value="tonnes">Tonnes</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Length Measurement">
          <Select
            value={settings.lengthMeasurement}
            onValueChange={(value) => updateSetting("lengthMeasurement", value)}
          >
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inches">Inches</SelectItem>
              <SelectItem value="centimeters">Centimeters</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Decimal Token">
          <Input
            value={settings.decimalToken}
            onChange={(e) => updateSetting("decimalToken", e.target.value)}
            className="w-32"
          />
        </FormField>

        <FormField label="Thousands Token">
          <Input
            value={settings.thousandsToken}
            onChange={(e) => updateSetting("thousandsToken", e.target.value)}
            className="w-32"
          />
        </FormField>

        <FormField label="Decimal Places">
          <Input
            value={settings.decimalPlaces}
            onChange={(e) => updateSetting("decimalPlaces", e.target.value)}
            className="w-32"
          />
        </FormField>

        <FormField label="Factoring Dimension">
          <Select
            value={settings.factoringDimension}
            onValueChange={(value) =>
              updateSetting("factoringDimension", value)
            }
          >
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product-depth">Product Depth</SelectItem>
              <SelectItem value="product-width">Product Width</SelectItem>
              <SelectItem value="product-height">Product Height</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold  mb-6 2xl:!text-[2.4rem]">Search Engine Optimization</h2>

        <FormField label="Home Page Title">
          <Input
            value={settings.homePageTitle}
            onChange={(e) => updateSetting("homePageTitle", e.target.value)}
            className="flex-1"
          />
        </FormField>

        <FormField label="Meta Keywords">
          <Input
            value={settings.metaKeywords}
            onChange={(e) => updateSetting("metaKeywords", e.target.value)}
            className="flex-1"
          />
        </FormField>

        <FormField label="Meta Description">
          <Input
            value={settings.metaDescription}
            onChange={(e) => updateSetting("metaDescription", e.target.value)}
            className="flex-1"
          />
        </FormField>

        <FormField label="WWW/No WWW Redirect">
          <Select
            value={settings.wwwRedirect}
            onValueChange={(value) => updateSetting("wwwRedirect", value)}
          >
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="redirect-www-to-no-www">
                Redirect WWW to no WWW
              </SelectItem>
              <SelectItem value="redirect-no-www-to-www">
                Redirect no WWW to WWW
              </SelectItem>
              <SelectItem value="no-redirect">No Redirect</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-4 2xl:!text-[2.4rem]">HTTPS</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p className="text-sm text-gray-700 2xl:!text-2xl">
            All of your storefront website traffic is served via HTTPS. Requests
            to the HTTP version of your storefront will automatically be
            redirected to HTTPS.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-4 2xl:!text-[2.4rem]">Search Engine Robots</h2>
        <p className="text-sm text-gray-600 mb-4 2xl:!text-2xl">
          For advanced users only, this section allows you to control which
          pages of your website will be crawled and indexed by search engines.{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Learn More
          </a>
        </p>

        <FormField label="HTTPS robots.txt" hasInfo={false}>
          <Textarea
            value={settings.robotsTxt}
            onChange={(e) => updateSetting("robotsTxt", e.target.value)}
            className="flex-1 "
            rows={15}
          />
        </FormField>
      </div>
    </div>
  );
};