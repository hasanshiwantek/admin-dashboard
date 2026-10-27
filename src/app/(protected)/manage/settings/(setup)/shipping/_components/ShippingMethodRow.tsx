import {
  DEFAULT_SHIPPING_METHOD_ICON,
  shippingMethodIcons,
} from "../[id]/constant";
import { Switch } from "@/components/ui/Switch";
import Image from "next/image";
import ShippingMethodEditModal from "./ShippingMethodEditModal";
import { ShippingMethodRowProps } from "./type";

const ShippingMethodRow = ({
  method,
  onToggle,
  onSaved,
}: ShippingMethodRowProps) => (
  <div className="flex items-center gap-10 px-8 py-8 hover:bg-gray-50">
    <div className="flex w-20 shrink-0 items-center justify-center">
      <Image
        src={
          shippingMethodIcons[method.method_type] ||
          DEFAULT_SHIPPING_METHOD_ICON
        }
        alt={method.display_name || "Shipping method"}
        width={120}
        height={120}
        className="object-contain"
      />
    </div>

    <p className="w-80 shrink-0 text-[15px]! font-medium text-muted-plum-gray!">
      {method.display_name}
    </p>

    <p className="flex-1 text-[15px]! leading-relaxed text-muted-plum-gray!">
      {method.custom_description || "-"}
    </p>

    <div className="flex shrink-0 items-center gap-4">
      <Switch
        checked={!!method.is_active}
        onCheckedChange={() => onToggle(method)}
      />
      {!!method.is_active && (
        <ShippingMethodEditModal method={method} onSaved={onSaved} />
      )}
    </div>
  </div>
);

export default ShippingMethodRow;
