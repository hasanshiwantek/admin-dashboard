import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import { InventoryCheckboxProps } from "./type";

// Checkbox with a description under its label, plus an optional text input
const InventoryCheckbox = ({ option }: InventoryCheckboxProps) => (
  <div className="flex flex-col gap-3">
    <InputField
      name={option.name}
      layout="vertical"
      Component={CheckboxField}
      className="items-start gap-4 pt-0"
      text={
        <span className="flex flex-col gap-1">
          <span className="text-[1.5rem] font-normal text-gray-800">
            {option.label}
          </span>
          <span className="text-[1.3rem] font-normal text-gray-500">
            {option.description}
          </span>
        </span>
      }
    />
    {option.inputName && (
      <InputField
        name={option.inputName}
        layout="vertical"
        containerClassName="ml-11 max-w-[42rem]"
      />
    )}
  </div>
);

export default InventoryCheckbox;
