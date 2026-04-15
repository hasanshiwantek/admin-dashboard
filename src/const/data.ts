export const brandOptions = [
  { label: "All Brands", value: "all" },
  { label: "HP", value: "1" },
  { label: "Dell", value: "2" },
  { label: "Lenovo", value: "3" },
  { label: "Apple", value: "4" },
  { label: "Acer", value: "5" },
  { label: "Asus", value: "6" },
  { label: "Samsung", value: "7" },
  { label: "Toshiba", value: "8" },
  { label: "MSI", value: "9" },
  { label: "LG", value: "10" },
];
// export const generateSlug = (value: string) => {
//   return value
//     .toLowerCase()
//     .replace(/[#$*&@!=+%`'"|/]/g, "")   
//     .replace(/\s+/g, "-")               
//     .replace(/-+/g, "-")                
//     .replace(/^-|-$/g, "");             
// };
export const generateSlug = (value: string) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace everything non-alphanumeric with -
    .replace(/-+/g, "-")         // remove multiple dashes
    .replace(/^-|-$/g, "");      // trim dashes
};