import { countriesListIconsRaw } from "@/const/location";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries?.registerLocale(enLocale);

/** Normalise a country code to ISO-2 (AFG → AF, AF → AF). */
export const getISO2 = (code: string) => {
  if (!code) return "";
  const upper = code.toUpperCase();
  if (upper.length === 2) return upper;
  return countries.alpha3ToAlpha2(upper) || upper;
};

/** Country list enriched with iso2 + flag url. */
export const countriesListIcons = countriesListIconsRaw?.map((country) => {
  const iso2 = getISO2(country?.value);
  return {
    ...country,
    iso2,
    flag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${iso2}.svg`,
  };
});

/** Find the enriched country entry for a raw country code. */
export const findCountry = (code?: string) =>
  countriesListIcons?.find(
    (c) => c.iso2 === getISO2(code || "") || c.value === code,
  );
