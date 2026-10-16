

export const timezoneOptions = [
  {
    value: "Europe/London",
    label: "Western Europe Time, Casablanca (GMT)",
  },
  {
    value: "America/New_York",
    label: "Eastern Time, New York (GMT-05:00)",
  },
  {
    value: "Asia/Karachi",
    label: "Pakistan Standard Time (GMT+05:00)",
  },
];

export const dateFormatOptions = [
  { value: "mmm-dd-yyyy", label: "Jul 24th 2020" },
  { value: "mm-dd-yyyy", label: "07/24/2020" },
  { value: "dd-mm-yyyy", label: "24/07/2020" },
];

 export const extendedDateFormatOptions = [
  {
    value: "long",
    label: "Jul 24th 2020 @ 3:49 AM",
  },
  {
    value: "short",
    label: "07/24/2020 3:49 AM",
  },
  {
    value: "24-hour",
    label: "24/07/2020 03:49",
  },
];

export const weightOptions = [
  { value: "ounces", label: "Ounces" },
  { value: "pounds", label: "Pounds" },
  { value: "grams", label: "Grams" },
  { value: "kilograms", label: "Kilograms" },
];

export const lengthOptions = [
  { value: "inches", label: "Inches" },
  { value: "feet", label: "Feet" },
  { value: "centimeters", label: "Centimeters" },
  { value: "meters", label: "Meters" },
];

export const decimalPlacesOptions = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export const factoringDimensionOptions = [
  { value: "product_depth", label: "Product depth" },
  { value: "product_width", label: "Product width" },
  { value: "product_height", label: "Product height" },
];

export const defaultValues = {
      weightMeasurement: "ounces",
      lengthMeasurement: "inches",
      thousandsToken: ",",
      decimalToken: ".",
      decimalPlaces: "2",
      factoringDimension: "product_depth",
    }
export const  countryDefaultValue = {
      country: "United States",
    }
  export const TimedefaultValues = {
      timezone: "Europe/London",
      daylightSaving: false,
      dateFormat: "mmm-dd-yyyy",
      extendedDateFormat: "long",
    }
export const storeFrontLanguage = {
    id: 1,
    channel: "New Ecom Store",
    type: "Stencil",
    defaultLanguage: "English (en)",
    additionalLanguages: "NA",
  }
  
export enum PhysicalDimensionFields {
  WEIGHT_MEASUREMENT = "weightMeasurement",
  LENGTH_MEASUREMENT = "lengthMeasurement",
  THOUSANDS_TOKEN = "thousandsToken",
  DECIMAL_TOKEN = "decimalToken",
  DECIMAL_PLACES = "decimalPlaces",
  FACTORING_DIMENSION = "factoringDimension",
}

export enum DateTimezoneFields {
  TIMEZONE = "timezone",
  DAYLIGHT_SAVING = "daylightSaving",
  DATE_FORMAT = "dateFormat",
  EXTENDED_DATE_FORMAT = "extendedDateFormat",
}