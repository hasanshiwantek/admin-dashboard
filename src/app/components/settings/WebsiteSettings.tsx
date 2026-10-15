import React from "react";
import { Card } from "@/components/ui/card";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import { WebsiteField, WwwRedirectOptions } from "./constant";

// Website Settings Component
export const WebsiteSettings = ({ control }: { control: any }) => {
  return (
    <div className="space-y-8">
      {/* Search Engine Optimization */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="font-semibold mb-6">Search Engine Optimization</h2>

        <div className="space-y-5">
          <InputField
            name={`website.${WebsiteField.HomePageTitle}`}
            label="Home Page Title"
            control={control}
          />

          <InputField
            name={`website.${WebsiteField.MetaKeywords}`}
            label="Meta Keywords"
            control={control}
          />

          <InputField
            name={`website.${WebsiteField.MetaDescription}`}
            label="Meta Description"
            control={control}
          />

          <InputField
            name={`website.${WebsiteField.WwwRedirect}`}
            label="WWW/No WWW Redirect"
            Component={SelectField}
            control={control}
            options={WwwRedirectOptions}
            placeholder="-- Choose a redirect option --"
          />
        </div>
      </div>

      {/* HTTPS */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="font-semibold mb-4">HTTPS</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-sm text-gray-700">
            All of your storefront website traffic is served via HTTPS. Requests
            to the HTTP version of your storefront will automatically be
            redirected to HTTPS.
          </p>
        </div>
      </div>

      {/* Search Engine Robots */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="font-semibold mb-4">Search Engine Robots</h2>

        <p className="text-sm text-gray-600 mb-4">
          For advanced users only, this section allows you to control which
          pages of your website will be crawled and indexed by search engines.{" "}
          <a
            href="https://developers.google.com/search/docs/crawling-indexing/robots/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Learn More
          </a>
        </p>

        <InputField
          name={`website.${WebsiteField.RobotsTxt}`}
          label="HTTPS robots.txt"
          isTextArea
          control={control}
        />
      </div>
    </div>
  );
};
