import { ReactNode } from "react";

export interface DeleteLocationModalProps {
  location: { id: number; name: string };
  /** Element that opens the modal; omit when using open/onOpenChange */
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Called after the location is deleted, e.g. to go back to the list */
  onDeleted?: () => void;
}
