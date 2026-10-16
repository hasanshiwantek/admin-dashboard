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