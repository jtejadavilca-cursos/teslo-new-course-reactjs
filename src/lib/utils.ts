import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const getNumberOrDefault = (value: string | number | undefined, defaultValue: number) => {
    if (!value || isNaN(Number(value))) return defaultValue;

    return Number(value);
};
