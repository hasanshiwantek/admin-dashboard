export type DateTimezoneValues = {
  timezone: string;
  daylightSaving: boolean;
  dateFormat: string;
  extendedDateFormat: string;
};

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