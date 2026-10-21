import { ReactNode } from "react";

export interface DeleteBackorderMessageModalProps {
  /** Element that opens the modal, e.g. the row's remove button */
  trigger: ReactNode;
  /** Removes the message once the user confirms */
  onDelete: () => void;
}
