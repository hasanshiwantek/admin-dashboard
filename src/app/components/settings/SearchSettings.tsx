"use client";

import { Control } from "react-hook-form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import {
  CONTENT_SORT_OPTIONS,
  SEARCH_LOGIC_OPTIONS,
  SearchField,
  SORT_OPTIONS,
} from "./constant";

export const SearchSettings = ({ control }: { control: Control<any> }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-6">Search Settings</h2>
        <div className="mt-3">
          <InputField
            name={`search.${SearchField.DefaultProductSort}`}
            label="Default Product Sort"
            control={control}
            Component={SelectField}
            options={SORT_OPTIONS}
          />
        </div>
        <div className="mt-3">
          <InputField
            name={`search.${SearchField.DefaultContentSort}`}
            label="Default Content Sort"
            control={control}
            Component={SelectField}
            options={CONTENT_SORT_OPTIONS}
          />
        </div>
        <div className="mt-3">
          <InputField
            name={`search.${SearchField.StorefrontSearchLogic}`}
            label="Storefront Search Logic"
            control={control}
            Component={SelectField}
            options={SEARCH_LOGIC_OPTIONS}
          />
        </div>
      </div>
    </div>
  );
};
