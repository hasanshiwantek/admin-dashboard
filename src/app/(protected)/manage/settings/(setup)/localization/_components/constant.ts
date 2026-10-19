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


export const timezoneOptions = [
  {
    value: Timezone.LONDON,
    label: "Western Europe Time, Casablanca (GMT)",
  },
  {
    value: Timezone.NEW_YORK,
    label: "Eastern Time, New York (GMT-05:00)",
  },
  {
    value: Timezone.KARACHI,
    label: "Pakistan Standard Time (GMT+05:00)",
  },
];

export const dateFormatOptions = [
  { value: DateFormat.MONTH_DAY_YEAR, label: "Jul 24th 2020" },
  { value: DateFormat.NUMERIC_MONTH_DAY_YEAR, label: "07/24/2020" },
  { value: DateFormat.DAY_MONTH_YEAR, label: "24/07/2020" },
];
 export const extendedDateFormatOptions = [
  { value: ExtendedDateFormat.LONG, label: "Jul 24th 2020 @ 3:49 AM" },
  { value: ExtendedDateFormat.SHORT, label: "07/24/2020 3:49 AM" },
  { value: ExtendedDateFormat.TWENTY_FOUR_HOUR, label: "24/07/2020 03:49" },
];

export const weightOptions = [
  { value: WeightMeasurement.OUNCES, label: "Ounces" },
  { value: WeightMeasurement.POUNDS, label: "Pounds" },
  { value: WeightMeasurement.GRAMS, label: "Grams" },
  { value: WeightMeasurement.KILOGRAMS, label: "Kilograms" },
];

export const lengthOptions = [
  { value: LengthMeasurement.INCHES, label: "Inches" },
  { value: LengthMeasurement.FEET, label: "Feet" },
  { value: LengthMeasurement.CENTIMETERS, label: "Centimeters" },
  { value: LengthMeasurement.METERS, label: "Meters" },
];


export const decimalPlacesOptions = [
  { value: DecimalPlaces.ZERO, label: "0" },
  { value: DecimalPlaces.ONE, label: "1" },
  { value: DecimalPlaces.TWO, label: "2" },
  { value: DecimalPlaces.THREE, label: "3" },
  { value: DecimalPlaces.FOUR, label: "4" },
];

export const factoringDimensionOptions = [
  { value: FactoringDimension.PRODUCT_DEPTH, label: "Product depth" },
  { value: FactoringDimension.PRODUCT_WIDTH, label: "Product width" },
  { value: FactoringDimension.PRODUCT_HEIGHT, label: "Product height" },
];

export const defaultValues = {
      weightMeasurement: WeightMeasurement.OUNCES,
      lengthMeasurement: LengthMeasurement.INCHES,
      thousandsToken: ",",
      decimalToken: ".",
      decimalPlaces: DecimalPlaces.TWO,
      factoringDimension: FactoringDimension.PRODUCT_DEPTH,
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
export enum CountryFields {
  COUNTRY = "country",
}