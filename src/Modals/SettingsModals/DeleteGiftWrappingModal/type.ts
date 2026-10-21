import { ReactNode } from "react";

export interface DeleteGiftWrappingModalProps {
  /** Gift wrapping options to delete */
  ids: number[];
  /** Element that opens the modal, e.g. "Delete Selected" */
  trigger?: ReactNode;
  /** Controlled mode, for opening from a row's actions menu */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Called after the options are deleted, e.g. to refresh the list */
  onDeleted?: () => void;
}
