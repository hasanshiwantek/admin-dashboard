import React from "react";
import { Card } from "@/components/ui/card";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import { WebsiteField, WwwRedirectOptions } from "./constant";
import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";

// Website Settings Component
export const WebsiteSettings = () => {
  return (
    <div className="space-y-8">
      {/* Search Engine Optimization */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <PageTitle title={"Search Engine Optimization"} hideActionButton />
        <div className="space-y-5">
          <InputField
            name={WebsiteField.HomePageTitle}
            label="Home Page Title"
          />

          <InputField name={WebsiteField.MetaKeywords} label="Meta Keywords" />

          <InputField
            name={WebsiteField.MetaDescription}
            label="Meta Description"
          />

          <InputField
            name={WebsiteField.WwwRedirect}
            label="WWW/No WWW Redirect"
            Component={SelectField}
            options={WwwRedirectOptions}
            placeholder="-- Choose a redirect option --"
          />
        </div>
      </div>

      {/* HTTPS */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <PageTitle title={"HTTPS"} hideActionButton />
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
        <PageTitle title={"Search Engine Robots"} hideActionButton />

        <p className="text-sm text-gray-600 mb-4">
          For advanced users only, this section allows you to control which
          pages of your website will be crawled and indexed by search engines.{" "}
          <Link
            href="https://developers.google.com/search/docs/crawling-indexing/robots/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Learn More
          </Link>
        </p>

        <InputField
          name={WebsiteField.RobotsTxt}
          label="HTTPS robots.txt"
          isTextArea
        />
      </div>
    </div>
  );
};
