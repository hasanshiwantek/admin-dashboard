import { ReactNode } from "react";

export interface ResetBasicTaxModalProps {
  /** Element that opens the modal, e.g. a "Reset configuration" button */
  trigger: ReactNode;
  /** Called after the configuration is reset, e.g. to reload it */
  onReset?: () => void;
}
