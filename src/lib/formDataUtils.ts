export default function objectToFormData(
  obj: Record<string, any>,
  form: FormData = new FormData(),
  namespace = ""
): FormData {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const formKey = namespace ? `${namespace}[${key}]` : key;
      const value = obj[key];

      if (value instanceof File) {
        form.append(formKey, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object" && !(item instanceof File)) {
            objectToFormData(item, form, `${formKey}[${index}]`);
          } else {
            form.append(`${formKey}[${index}]`, item);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        objectToFormData(value, form, formKey);
      } else if (value !== undefined && value !== null) {
        form.append(formKey, value);
      }
    }
  }
  return form;
}

// utils/formDataUtils.ts
export function buildUpdateProductFormData(
  productId: string | number,
  data: Record<string, any>
): FormData {
  const formData = new FormData();

  for (const key in data) {
    if (!data.hasOwnProperty(key)) continue;
    const value = data[key];

    if (value === undefined || value === null) continue;

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File) {
          formData.append(`${key}[${index}]`, item);
        } else if (typeof item === "object" && item.file instanceof File) {
          formData.append(`${key}[${index}][file]`, item.file);
        } else {
          formData.append(`${key}[]`, convertBoolean(item));
        }
      });
    } else if (typeof value === "object") {
      for (const subKey in value) {
        if (value[subKey] !== null && value[subKey] !== undefined) {
          formData.append(`${key}[${subKey}]`, convertBoolean(value[subKey]));
        }
      }
    } else {
      formData.append(key, convertBoolean(value));
    }
  }

  return formData;
}

// 🔄 Convert boolean true/false to 1/0
function convertBoolean(value: any) {
  if (typeof value === "boolean") return value ? "1" : "0";
  return value;
}
