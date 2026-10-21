import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UrlFormat } from "../constant";
import { UrlFormatFieldProps } from "./type";

// Short / Long / Custom URL format radios, each showing an example URL;
// plug into <InputField Component={UrlFormatField} section={...}>
const UrlFormatField = ({
  section,
  customInput,
  value,
  onChange,
  id,
}: UrlFormatFieldProps) => {
  const options = [
    {
      value: UrlFormat.SeoOptimizedShort,
      label: "SEO Optimized (Short)",
      detail: section.shortExample,
    },
    {
      value: UrlFormat.SeoOptimizedLong,
      label: "SEO Optimized (Long)",
      detail: section.longExample,
    },
    { value: UrlFormat.Custom, label: "Custom", detail: customInput },
  ];

  return (
    <RadioGroup id={id} value={value ?? ""} onValueChange={onChange}>
      <ListRenderer
        data={options}
        keyExtractor={(option) => option.value}
        className="space-y-4!"
        renderItem={(option) => (
          <div className="grid grid-cols-[18rem_1fr] items-center gap-4">
            <Label className="font-normal text-gray-600 2xl:text-2xl!">
              <RadioGroupItem value={option.value} />
              {option.label}
            </Label>
            <div className="text-[1.4rem]! text-gray-500!">{option.detail}</div>
          </div>
        )}
      />
    </RadioGroup>
  );
};

export default UrlFormatField;
