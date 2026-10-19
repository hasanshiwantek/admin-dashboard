import { ReactNode } from "react";

export interface DeleteUserModalProps {
  user: { id: number; name?: string };
  /** Element that opens the modal, e.g. a trash button */
  trigger: ReactNode;
  /** Called after the user is deleted, e.g. to refresh the list */
  onDeleted?: () => void;
}
