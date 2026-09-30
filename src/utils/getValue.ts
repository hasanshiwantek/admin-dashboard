export const getValue = (
  value: any,
  fallback: string = "N/A"
) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return fallback;
  }

  return value;
};
