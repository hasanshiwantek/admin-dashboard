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

const name = (field: SearchField) => fieldPath(GeneralSection.Search, field);

const SearchSection = () => (
  <SettingsCard title="Search Settings">
    <InputField
      name={name(SearchField.DefaultProductSort)}
      label="Default Product Sort"
      Component={SelectField}
      options={searchSortOptions}
    />
    <InputField
      name={name(SearchField.DefaultContentSort)}
      label="Default Content Sort"
      Component={SelectField}
      options={contentSortOptions}
    />
    <InputField
      name={name(SearchField.StorefrontSearchLogic)}
      label="Storefront Search Logic"
      Component={SelectField}
      options={searchLogicOptions}
    />
  </SettingsCard>
);

export default SearchSection;
