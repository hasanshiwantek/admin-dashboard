import type { RegisterOptions } from "react-hook-form";
import type { ClipboardEvent, FormEvent, KeyboardEvent } from "react";
import { REGEX } from "@/const/regex";

export const restrictDecimalInput = (
  event: KeyboardEvent<HTMLInputElement>,
) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
  ];

  if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
    return;
  }

  if (event.key === ".") {
    const hasSelection =
      event.currentTarget.selectionStart !== null &&
      event.currentTarget.selectionEnd !== null;
    if (event.currentTarget.value.includes(".") && hasSelection) {
      event.preventDefault();
    }
    return;
  }

  if (!REGEX.NUMERIC_DIGIT.test(event.key)) {
    event.preventDefault();
    return;
  }

};

export const restrictDecimalValue = (event: FormEvent<HTMLInputElement>) => {
  const input = event.currentTarget;
  const nextValue = normalizeDecimalValue(input.value);

  if (input.value !== nextValue) input.value = nextValue;
};

const normalizeDecimalValue = (value: string) => {
  const sanitizedValue = value.replace(REGEX.DECIMAL_SANITIZE, "");
  const [rawIntegerPart, ...decimalParts] = sanitizedValue.split(".");
  const integerPart = rawIntegerPart.replace(REGEX.DECIMAL_LEADING_ZEROS, "") ||
    (decimalParts.length ? "0" : "");

  return decimalParts.length
    ? `${integerPart}.${decimalParts.join("").slice(0, 2)}`
    : integerPart;
};

export const restrictDecimalPaste = (
  event: ClipboardEvent<HTMLInputElement>,
) => {
  const pastedValue = event.clipboardData
    .getData("text")
    .replace(REGEX.DECIMAL_SANITIZE, "");
  const { value, selectionStart, selectionEnd } = event.currentTarget;
  // Number inputs may not expose selection positions. Replace their value so
  // selecting the whole field and pasting does not append to the old value.
  const hasSelection = selectionStart !== null && selectionEnd !== null;
  const start = hasSelection ? selectionStart : 0;
  const end = hasSelection ? selectionEnd : value.length;
  const normalizedPaste = pastedValue.replace(
    REGEX.DECIMAL_DUPLICATE_POINT,
    ".$1",
  );
  const nextValue = value.slice(0, start) + normalizedPaste + value.slice(end);
  const truncatedValue = normalizeDecimalValue(nextValue);

  event.preventDefault();
  const valueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;
  valueSetter?.call(event.currentTarget, truncatedValue);
  event.currentTarget.dispatchEvent(new Event("input", { bubbles: true }));
};

export const restrictWholeNumberInput = (
  event: KeyboardEvent<HTMLInputElement>,
) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
  ];

  if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
    return;
  }

  if (!REGEX.NUMERIC_DIGIT.test(event.key)) event.preventDefault();
};

export const restrictWholeNumberPaste = (
  event: ClipboardEvent<HTMLInputElement>,
) => {
  if (!REGEX.WHOLE_NUMBER.test(event.clipboardData.getData("text"))) {
    event.preventDefault();
  }
};

export const normalizeWholeNumberValue = (
  event: FormEvent<HTMLInputElement>,
) => {
  const input = event.currentTarget;
  const normalizedValue = input.value.replace(/^0+(?=\d)/, "");

  if (input.value !== normalizedValue) input.value = normalizedValue;
};

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

export const decimalValidation = (
  fieldLabel: string,
): RegisterOptions<any, any> => ({
  valueAsNumber: true,
  min: {
    value: 0,
    message: `${fieldLabel} cannot be negative`,
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

    return (
      Number.isInteger(Number(value) * 100) ||
      `${fieldLabel} must have at most 2 decimal places`
    );
  },
});
