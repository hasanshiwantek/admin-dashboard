import { Input } from "@/components/ui/input";
import { UnitInputProps } from "./type";

// Number input with a unit box before ("$") or after ("Inches");
// plug into <InputField Component={UnitInput} unit="..." unitPosition="...">
const UnitInput = ({ unit, unitPosition, ...inputProps }: UnitInputProps) => {
  const unitBox = (
    <span
      className={`bg-gray-100 px-3 py-2 text-sm text-gray-500 ${
        unitPosition === "prefix" ? "border-r" : "border-l"
      }`}
    >
      {unit}
    </span>
  );

  return (
    <div className="flex items-center overflow-hidden rounded-md border">
      {unitPosition === "prefix" && unitBox}
      <Input
        type="number"
        {...inputProps}
        className="max-w-full rounded-none border-0 focus-visible:ring-0"
      />
      {unitPosition === "suffix" && unitBox}
    </div>
  );
};

export default UnitInput;
