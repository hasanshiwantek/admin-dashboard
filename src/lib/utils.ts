import { BASE62_STRING } from "@/const/appConstants";
import { clsx, type ClassValue } from "clsx";
import { isEmpty } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueCode(length = 4): string {
  let code = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * BASE62_STRING.length);
    code += BASE62_STRING[index];
  }

  return code;
}

export function convertOptionsToObject(
  options: { value: string; label: string }[],
): Record<string, string> {
  return options.reduce(
    (acc, option) => {
      acc[option.value] = option.label;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export function removeEmptyValues(
  data: any,
  keepEmptyArrays: boolean = false,
): any {
  // 1. Handle null, undefined, or NaN
  if (data === null || data === undefined || Number.isNaN(data)) {
    return undefined;
  }

  // 2. Handle primitives (number, boolean, string, symbol, bigint)
  if (typeof data !== "object") {
    return data === "" ? undefined : data;
  }

  // 3. Handle special built-in objects that shouldn't be iterated as plain objects
  if (
    data instanceof File ||
    data instanceof Blob ||
    data instanceof Date ||
    data instanceof RegExp
  ) {
    return data;
  }

  // 4. Handle Arrays recursively
  if (Array.isArray(data)) {
    const cleanedArray = data
      .map((item) => removeEmptyValues(item, keepEmptyArrays))
      .filter((item) => item !== undefined);

    // Respect the boolean flag for empty arrays
    if (keepEmptyArrays) {
      return cleanedArray;
    }
    return cleanedArray.length > 0 ? cleanedArray : undefined;
  }

  // 5. Handle Plain Objects recursively
  const cleanedObj: Record<string, any> = {};
  let hasValidKeys = false;

  for (const key of Object.keys(data)) {
    const cleanedValue = removeEmptyValues(data[key], keepEmptyArrays);

    if (cleanedValue !== undefined) {
      cleanedObj[key] = cleanedValue;
      hasValidKeys = true;
    }
  }

  return hasValidKeys ? cleanedObj : undefined;
}

export function buildQueryParams(payload: Record<string, any> = {}): string {
  const queryParams = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    // Ignore undefined, null, or empty string values
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null && v !== "") {
          queryParams.append(key, String(v));
        }
      });
    } else {
      queryParams.set(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
}
