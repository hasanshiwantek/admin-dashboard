import { ReactNode } from "react";

export interface DeleteTaxZonesModalProps {
  zones: { id: number; name: string }[];
  /** Element that opens the modal; omit when using open/onOpenChange */
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Called after the zones are deleted, e.g. to clear the selection */
  onDeleted?: () => void;
}
