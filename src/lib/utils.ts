import { BASE62_STRING } from "@/const/appConstants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
