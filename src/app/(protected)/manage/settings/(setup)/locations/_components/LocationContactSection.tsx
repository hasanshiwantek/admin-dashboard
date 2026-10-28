import InputField from "@/components/form/InputField";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { LocationFormNames, LocationSection } from "../constant";

const LocationContactSection = () => (
  <SettingsCard
    id={LocationSection.Contact}
    title="Contact details"
    className="scroll-mt-6"
  >
    <InputField
      name={LocationFormNames.Phone}
      label="Phone"
      layout="vertical"
      type="tel"
      controlClassName="max-w-[41.6rem]"
    />
    <InputField
      name={LocationFormNames.Email}
      label="Email"
      required
      layout="vertical"
      type="email"
      controlClassName="max-w-[41.6rem]"
    />
  </SettingsCard>
);

export default LocationContactSection;
