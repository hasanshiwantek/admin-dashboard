export type DateTimezoneValues = {
  timezone: string;
  daylightSaving: boolean;
  dateFormat: string;
  extendedDateFormat: string;
};
export type PhysicalDimensionsValues = {
  weightMeasurement: string;
  lengthMeasurement: string;
  thousandsToken: string;
  decimalToken: string;
  decimalPlaces: string;
  factoringDimension: string;
};
export type CountryFormValues = {
  country: string;
};

export type Section = {
  id: string;
  label: string;
};

export type LocalizationSidebarProps = {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
};
export type StorefrontLanguage = {
  id: number;
  channel: string;
  type: string;
  defaultLanguage: string;
  additionalLanguages: string;
};
export enum DecimalPlaces {
  ZERO = "0",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
}

export enum Timezone {
  LONDON = "Europe/London",
  NEW_YORK = "America/New_York",
  KARACHI = "Asia/Karachi",
}

export enum DateFormat {
  MONTH_DAY_YEAR = "mmm-dd-yyyy",
  NUMERIC_MONTH_DAY_YEAR = "mm-dd-yyyy",
  DAY_MONTH_YEAR = "dd-mm-yyyy",
}

export enum ExtendedDateFormat {
  LONG = "long",
  SHORT = "short",
  TWENTY_FOUR_HOUR = "24-hour",
}

export enum WeightMeasurement {
  OUNCES = "ounces",
  POUNDS = "pounds",
  GRAMS = "grams",
  KILOGRAMS = "kilograms",
}

export enum LengthMeasurement {
  INCHES = "inches",
  FEET = "feet",
  CENTIMETERS = "centimeters",
  METERS = "meters",
}



export enum FactoringDimension {
  PRODUCT_DEPTH = "product_depth",
  PRODUCT_WIDTH = "product_width",
  PRODUCT_HEIGHT = "product_height",
}