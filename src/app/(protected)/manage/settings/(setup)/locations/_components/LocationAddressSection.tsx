import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import SettingsCard from "../../../_components/SettingsCard";
import {
  countryOptions,
  LocationFormNames,
  LocationSection,
  usStateOptions,
} from "../constant";
import { LocationAddressSectionProps } from "./type";

const FULL_WIDTH = "max-w-[41.6rem]";
const PAIR_GRID = "grid max-w-[41.6rem] grid-cols-2 gap-x-6 gap-y-5";

const LocationAddressSection = ({
  isUnitedStates,
  onCountryChange,
}: LocationAddressSectionProps) => (
  <SettingsCard id={LocationSection.Address} title="Address" className="scroll-mt-6">
    <InputField
      name={LocationFormNames.Address1}
      label="Address 1"
      required
      layout="vertical"
      controlClassName={FULL_WIDTH}
    />
    <InputField
      name={LocationFormNames.Address2}
      label="Address 2"
      layout="vertical"
      controlClassName={FULL_WIDTH}
    />

    <div className={PAIR_GRID}>
      <InputField
        name={LocationFormNames.City}
        label="City"
        required
        layout="vertical"
      />
      <InputField
        name={LocationFormNames.Country}
        label="Country"
        required
        layout="vertical"
        Component={SelectField}
        options={countryOptions}
        getValueOnChange={onCountryChange}
      />
      <InputField
        name={LocationFormNames.PostalCode}
        label="Postal code"
        required={isUnitedStates}
        layout="vertical"
      />
      {isUnitedStates ? (
        <InputField
          name={LocationFormNames.State}
          label="State"
          required
          layout="vertical"
          Component={SelectField}
          options={usStateOptions}
          placeholder="Choose state"
        />
      ) : (
        <InputField
          name={LocationFormNames.State}
          label="State"
          layout="vertical"
        />
      )}
    </div>

    <div>
      <h4 className="text-[1.5rem]! font-semibold text-text-heading!">
        Geolocation
      </h4>
      <p className="mt-2 text-[1.3rem]! text-muted-plum-gray!">
        The latitude/longitude is used to identify the location closest to the
        shopper&apos;s location.
      </p>
    </div>
    <div className={PAIR_GRID}>
      <InputField
        name={LocationFormNames.Latitude}
        label="Latitude"
        required
        layout="vertical"
        type="number"
      />
      <InputField
        name={LocationFormNames.Longitude}
        label="Longitude"
        required
        layout="vertical"
        type="number"
      />
    </div>
  </SettingsCard>
);

export default LocationAddressSection;
