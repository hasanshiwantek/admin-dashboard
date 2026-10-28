import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { PickupMethodFormNames } from "../constant";
import { PickupMethodFormFieldsProps } from "./type";

// Set on each control (not controlClassName) so it overrides the inputs' own
// max-w-md and the hints keep the full width
const FIELD_WIDTH = "max-w-[41.6rem]";
const labelClassName = "font-bold!";

const PickupMethodFormFields = ({ locations }: PickupMethodFormFieldsProps) => (
  <SettingsCard title="Details" className="border-0 shadow-sm">
    <InputField
      name={PickupMethodFormNames.Name}
      label="Name"
      layout="vertical"
      className={FIELD_WIDTH}
      labelClassName={labelClassName}
    />
    <InputField
      name={PickupMethodFormNames.LocationId}
      label="Location"
      layout="vertical"
      Component={SelectField}
      options={locations}
      valueKey="id"
      labelKey="name"
      placeholder="Choose location"
      className={FIELD_WIDTH}
      labelClassName={labelClassName}
    />
    <InputField
      name={PickupMethodFormNames.EstimatedReadyTime}
      label="Estimated ready-for-pickup time"
      layout="vertical"
      hint="The expected time between an order being placed and a customer being able to pick it up."
      hintPosition="top"
      className={FIELD_WIDTH}
      labelClassName={labelClassName}
    />
    <InputField
      name={PickupMethodFormNames.Instructions}
      label="Instruction message for pickup"
      layout="vertical"
      hint="Let your customers know what to bring and do when they arrive at your store to pick up their order."
      hintPosition="top"
      isTextArea
      className={`min-h-[8rem] ${FIELD_WIDTH}`}
      labelClassName={labelClassName}
    />
  </SettingsCard>
);

export default PickupMethodFormFields;
