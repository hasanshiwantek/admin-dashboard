import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { fieldPath } from "../utils";
import { CheckboxSettingsListProps } from "./type";

// Renders a config list of checkbox settings for one form section
const CheckboxSettingsList = ({ section, items }: CheckboxSettingsListProps) => (
  <ListRenderer
    data={items}
    keyExtractor={(item) => item.field}
    emptyComponent={<></>}
    className="space-y-5! p-0!"
    renderItem={(item) => (
      <InputField
        name={fieldPath(section, item.field)}
        label={item.label}
        Component={CheckboxField}
        text={item.text}
      />
    )}
  />
);

export default CheckboxSettingsList;
