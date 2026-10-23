import InputField from "@/components/form/InputField";
import SettingsCard from "../../../_components/SettingsCard";
import { LocationFormNames, LocationSection } from "../constant";

const LocationGeneralSection = () => (
  <SettingsCard id={LocationSection.General} title="General" className="scroll-mt-6">
    <InputField
      name={LocationFormNames.Name}
      label="Name"
      required
      layout="vertical"
      hint="This is the location name customers will see."
      hintPosition="top"
      controlClassName="max-w-[41.6rem]"
    />
    <InputField
      name={LocationFormNames.Code}
      label="Code"
      layout="vertical"
      hint="The identifier you use internally for this location."
      hintPosition="top"
      controlClassName="max-w-[41.6rem]"
    />
  </SettingsCard>
);

export default LocationGeneralSection;
