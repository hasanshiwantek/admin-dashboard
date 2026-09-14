import { BASE62_STRING } from "@/const/appConstants";
import { clsx, type ClassValue } from "clsx";
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

export function toBase62(num: number): string {
  if (num === 0) return "0";

  let result = "";

  while (num > 0) {
    result = BASE62_STRING[num % 62] + result;
    num = Math.floor(num / 62);
  }

  return result;
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
