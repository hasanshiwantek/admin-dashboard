import { Button } from "@/components/ui/button";
import FedExConfigModal from "@/Modals/ShippingModals/FedExConfigModal/FedExConfigModal";
import ShipByWeightModal from "@/Modals/ShippingModals/ShipByWeightModal/ShipByWeightModal";
import ShippingQuotesDisplayNameModal from "@/Modals/ShippingModals/ShippingQuotesDisplayNameModal/ShippingQuotesDisplayNameModal";
import { ShippingMethodType } from "../[id]/constant";
import { ShippingMethodEditModalProps } from "./type";

// Each method type has its own edit modal; all open from the same Edit button
const modalByType = (methodType: string) => {
  if (methodType === ShippingMethodType.FedexRealtime) return FedExConfigModal;
  if (methodType === ShippingMethodType.CustomLabel)
    return ShippingQuotesDisplayNameModal;
  return ShipByWeightModal;
};

const ShippingMethodEditModal = ({
  method,
  onSaved,
}: ShippingMethodEditModalProps) => {
  console.log({ method });
  const EditModal = modalByType(method.method_type);

  return (
    <EditModal
      methodId={method.id}
      onSaved={onSaved}
      trigger={
        <Button type="button" variant="outline">
          Edit
        </Button>
      }
    />
  );
};

export default ShippingMethodEditModal;
