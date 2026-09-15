import type { RegisterOptions } from "react-hook-form";

export const wholeNumberValidation = (
  fieldLabel: string,
): RegisterOptions<any, any> => ({
  valueAsNumber: true,
  setValueAs: (value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined;
    }

    const numberValue = Number(value);
    return Number.isNaN(numberValue) ? undefined : numberValue;
  },
  min: {
    value: 0,
    message: `${fieldLabel} must be a whole number`,
  },
  validate: (value) => {
    if (
      value === "" ||
      value === undefined ||
      value === null ||
      Number.isNaN(value)
    ) {
      return true;
    }

    return Number.isInteger(value) || `${fieldLabel} must be a whole number`;
  },
});
