import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { DeliveryServicesFieldProps } from "./type";
import { toggleInList } from "./utils";

// Small underlined text buttons, sized to sit inline with the "|" separator
const LINK_BUTTON_CLASS = "h-auto p-0 text-sm text-gray-500 underline";

// Multi-checkbox list; plug into <InputField Component={DeliveryServicesField}>
const DeliveryServicesField = ({
  services,
  value = [],
  onChange,
  id,
}: DeliveryServicesFieldProps) => (
  <div id={id} className="space-y-3">
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Button
        type="button"
        variant="link"
        className={LINK_BUTTON_CLASS}
        onClick={() => onChange?.(services.map((s) => s.key))}
      >
        Select All
      </Button>
      |
      <Button
        type="button"
        variant="link"
        className={LINK_BUTTON_CLASS}
        onClick={() => onChange?.([])}
      >
        None
      </Button>
    </div>
    <ListRenderer
      data={services}
      keyExtractor={(service) => service.key}
      emptyComponent={<></>}
      className="items-start! p-0!"
      renderItem={(service) => (
        <label className="flex items-center gap-3">
          <Checkbox
            checked={value.includes(service.key)}
            onCheckedChange={() => onChange?.(toggleInList(value, service.key))}
          />
          <span className="text-sm! font-normal!">{service.label}</span>
        </label>
      )}
    />
  </div>
);

export default DeliveryServicesField;
