import { ReactNode } from "react";

export interface DeleteProductModalProps {
  products: { id: number; name: string }[];
  /** Element that opens the modal; omit when using open/onOpenChange */
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Called after the products are deleted, e.g. to refresh or leave the page */
  onDeleted?: () => void;
}
