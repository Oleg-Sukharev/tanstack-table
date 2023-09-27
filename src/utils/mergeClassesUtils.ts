import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function mergeClassesUtils(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
