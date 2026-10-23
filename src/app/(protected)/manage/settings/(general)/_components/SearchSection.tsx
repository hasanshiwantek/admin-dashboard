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

const name = (field: SearchField) => fieldPath(GeneralSection.Search, field);

const SearchSection = () => (
  <SettingsCard title="Search Settings">
    <InputField
      name={name(SearchField.DefaultProductSort)}
      label="Default Product Sort"
      Component={SelectField}
      options={searchSortOptions}
       afterFieldComponent={
          <CircleHelp  className="w-6 h-6 text-muted-foreground" />
        }
         controlClassName="max-w-md"
    />
    <InputField
      name={name(SearchField.DefaultContentSort)}
      label="Default Content Sort"
      Component={SelectField}
      options={contentSortOptions}
       afterFieldComponent={
          <CircleHelp  className="w-6 h-6 text-muted-foreground" />
        }
          controlClassName="max-w-md"
    />
    <InputField
      name={name(SearchField.StorefrontSearchLogic)}
      label="Storefront Search Logic"
      Component={SelectField}
      options={searchLogicOptions}
       afterFieldComponent={
          <CircleHelp  className="w-6 h-6 text-muted-foreground" />
        }
        controlClassName="max-w-md"
    />
  </SettingsCard>
);

export default SearchSection;
