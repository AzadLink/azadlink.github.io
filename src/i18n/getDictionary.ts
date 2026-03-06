import type en from "./en.json";

export type Dictionary = typeof en;
export type Locale = "en" | "fa";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en.json").then((m) => m.default),
  fa: () => import("./fa.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]();
};

export const locales: Locale[] = ["en", "fa"];
export const defaultLocale: Locale = "en";
