import { REGEX } from "@/const/regex";

// Money helpers, matching the storefront's (new-town-spares src/lib/money.ts).
// Prices are kept at the currency's dashboard decimal places (roundTo): a
// price converted from USD stays exact (e.g. 57.576614 GBP at 6 places). Only
// an amount that is charged — an order's total — is rounded once to whole
// minor units (money: cents/pence; whole yen for zero-decimal currencies;
// fils for three-decimal currencies), half up, after the exact amounts are
// added up. The dashboard, storefront and backend arrive at the same amounts.

// Rounds half up to `places` decimals without float drift
// (56.5078896 → 56.50789 at 5 places; 1.005 → 1.01 at 2, where toFixed gives 1.00)
export const roundTo = (value: number, places: number) => {
  const shifted = `${value}e${places}`;
  return REGEX.DOUBLE_EXPONENT.test(shifted)
    ? Math.round(value * 10 ** places) / 10 ** places
    : Number(`${Math.round(Number(shifted))}e-${places}`);
};

export type Money = { minor: number; currency: string };

// Stripe charges these in whole units, not cents.
// https://docs.stripe.com/currencies#zero-decimal
const ZERO_DECIMAL_CURRENCIES = [
  "BIF",
  "CLP",
  "DJF",
  "GNF",
  "JPY",
  "KMF",
  "KRW",
  "MGA",
  "PYG",
  "RWF",
  "UGX",
  "VND",
  "VUV",
  "XAF",
  "XOF",
  "XPF",
];

// Stripe charges these in thousandths (fils), but the last digit must be 0.
// https://docs.stripe.com/currencies#three-decimal
const THREE_DECIMAL_CURRENCIES = ["BHD", "JOD", "KWD", "OMR", "TND"];

// Stripe's minor units — used for amounts/charges, not for display (the
// dashboard's decimalPlaces setting decides how many places are shown)
const decimalsFor = (currency: string) => {
  const code = currency.toUpperCase();
  if (ZERO_DECIMAL_CURRENCIES.includes(code)) return 0;
  if (THREE_DECIMAL_CURRENCIES.includes(code)) return 3;
  return 2;
};

const unit = (currency: string) => 10 ** decimalsFor(currency);

// Smallest step an amount is rounded to, in minor units: 10 for three-decimal
// currencies (so the amount ends in 0, as Stripe requires), else 1
const step = (currency: string) => (decimalsFor(currency) === 3 ? 10 : 1);

// A major-unit amount (e.g. 12.34) → Money, rounded once to the minor unit.
export const money = (
  amount: number | string | null | undefined,
  currency: string,
): Money => {
  const s = step(currency);
  return {
    minor: Math.round((Number(amount || 0) * unit(currency)) / s) * s,
    currency: currency.toUpperCase(),
  };
};

export const toMajor = (m: Money) => m.minor / unit(m.currency);
