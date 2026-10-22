import { ReactNode } from "react";

export interface DeletePickupMethodModalProps {
  pickupMethod: { id: number; name: string };
  /** Element that opens the modal; omit when using open/onOpenChange */
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Called after the pickup method is deleted, e.g. to refresh the list */
  onDeleted?: () => void;
}
