import { ShippingAddress, ShippingMethod, ShippingZone } from "../type";

// Modal types live with the modals in src/Modals/Shipping/

export interface ShippingOriginSectionProps {
  address: ShippingAddress | null;
  loading?: boolean;
}

export interface ShippingZonesSectionProps {
  zones: ShippingZone[];
  loading?: boolean;
  onToggle: (zone: ShippingZone) => void;
  onDelete: (zone: ShippingZone) => Promise<unknown>;
}

export interface ShippingZoneRowProps {
  zone: ShippingZone;
  onToggle: (zone: ShippingZone) => void;
  onDelete: (zone: ShippingZone) => Promise<unknown>;
}

export interface ShippingMethodsSectionProps {
  title: string;
  methods: ShippingMethod[];
  loading?: boolean;
  onToggle: (method: ShippingMethod) => void;
  /** Called after a method is saved in its edit modal */
  onMethodSaved?: () => void;
}

export interface ShippingMethodRowProps {
  method: ShippingMethod;
  onToggle: (method: ShippingMethod) => void;
  onSaved?: () => void;
}

export interface ShippingMethodEditModalProps {
  method: ShippingMethod;
  onSaved?: () => void;
}
