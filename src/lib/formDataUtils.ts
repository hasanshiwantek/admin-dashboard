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
