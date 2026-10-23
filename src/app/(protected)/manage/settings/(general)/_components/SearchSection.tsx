import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import {
  contentSortOptions,
  GeneralSection,
  SearchField,
  searchLogicOptions,
  searchSortOptions,
} from "../constant";
import { fieldPath } from "../utils";
import SettingsCard from "../../_components/SettingsCard";
import { CircleHelp } from "lucide-react";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";

const name = (field: SearchField) => fieldPath(GeneralSection.Search, field);

const SearchSection = () => (
  <SettingsCard title="Search Settings">
    <InputField
      name={name(SearchField.DefaultProductSort)}
      label="Default Product Sort"
      Component={SelectField}
      options={searchSortOptions}
      afterFieldComponent={
        <HelpTooltip
          side="right"
          content={
            <div className="flex flex-col gap-1">
              <p>
                This is the default sorting order for all the products that are
                found in the search.
              </p>
            </div>
          }
          iconClassName="fill-muted-plum-gray"
        />
      }
      controlClassName="max-w-md"
    />
    <InputField
      name={name(SearchField.DefaultContentSort)}
      label="Default Content Sort"
      Component={SelectField}
      options={contentSortOptions}
      afterFieldComponent={
        <HelpTooltip
          side="right"
          content={
            <div className="flex flex-col gap-1">
              <p>
                This is the default sorting order for all information & news
                items that are found in the search.
              </p>
            </div>
          }
          iconClassName="fill-muted-plum-gray"
        />
      }
      controlClassName="max-w-md"
    />
    <InputField
      name={name(SearchField.StorefrontSearchLogic)}
      label="Storefront Search Logic"
      Component={SelectField}
      options={searchLogicOptions}
      afterFieldComponent={
        <HelpTooltip
          side="right"
          content={
            <div className="flex flex-col gap-1">
              <p>
                This setting only controls search results on your storefront
                (the path shoppers see). Searches in the admin area of your
                store (the control panel) always shows results that contains all
                words.
              </p>
            </div>
          }
          iconClassName="fill-muted-plum-gray"
        />
      }
      controlClassName="max-w-md"
    />
  </SettingsCard>
);

export default SearchSection;
