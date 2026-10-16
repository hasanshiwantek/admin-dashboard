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
import PageTitle from "@/components/ui/PageTitle";

export const SearchSettings = ({ control }: { control: Control<any> }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <PageTitle title={"Search Settings"} hideActionButton />
        <div className="mt-3">
          <InputField
            name={SearchField.DefaultProductSort}
            label="Default Product Sort"
            control={control}
            Component={SelectField}
            options={SORT_OPTIONS}
          />
        </div>
        <div className="mt-3">
          <InputField
            name={SearchField.DefaultContentSort}
            label="Default Content Sort"
            control={control}
            Component={SelectField}
            options={CONTENT_SORT_OPTIONS}
          />
        </div>
        <div className="mt-3">
          <InputField
            name={SearchField.StorefrontSearchLogic}
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
