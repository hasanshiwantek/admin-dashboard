import { ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";
import type { TabItem } from "@/components/ui/AppTabs/types";

export type ModalSize = "sm" | "md" | "lg" | "xl";

// Handed to `children` when it's a function, e.g. to close from inside
export interface ModalApi {
  close: () => void;
}

// Returning `false` from onSave/onSubmit keeps the modal open (e.g. on error)
export type ModalAction<A extends unknown[] = []> = (
  ...args: A
) => unknown | Promise<unknown>;

export interface ModalProps<T extends FieldValues = FieldValues> {
  /** Body; optional when the active tab's `content` provides it */
  children?: ReactNode | ((api: ModalApi) => ReactNode);

  // ─── Open state ────────────────────────────────────────────
  /** Element that opens the modal; the modal then manages its own state */
  trigger?: ReactNode;
  /** Controlled mode (optional) — see useModal() */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;

  // ─── Header ────────────────────────────────────────────────
  title?: ReactNode;
  description?: ReactNode;
  /** Rendered with AppTabs (underline variant) */
  tabs?: TabItem[];
  /** Controlled active tab; leave out to let the modal track it */
  activeTab?: string;
  /** Uncontrolled starting tab (default: first tab); restored on close */
  defaultTab?: string;
  onTabChange?: (tabKey: string) => void;
  showCloseButton?: boolean;

  // ─── Body loading ──────────────────────────────────────────
  /** Dims the body and shows a centered spinner, e.g. while fetching data */
  contentLoading?: boolean;
  /** Text under the spinner (default "Loading...") */
  contentLoadingText?: string;
  /** Error banner at the top of the body, e.g. a failed fetch or save */
  error?: ReactNode;
  errorClassName?: string;

  // ─── Form mode ─────────────────────────────────────────────
  /** Wraps the body in <Form>; the save button submits it */
  isForm?: boolean;
  form?: UseFormReturn<T, any, any>;
  onSubmit?: ModalAction<[values: T]>;
  onInvalid?: (errors: FieldErrors<T>) => void;

  // ─── Footer ────────────────────────────────────────────────
  /** Replace the default footer, or `false` to hide it */
  footer?: ReactNode | false;
  onSave?: ModalAction;
  onCancel?: () => void;
  saveText?: string;
  loadingText?: string;
  cancelText?: string;
  hideCancel?: boolean;
  /** Shows the loading text and disables both buttons */
  loading?: boolean;
  /** Disables only the save button */
  saveDisabled?: boolean;
  /** Close after onSave/onSubmit succeeds (default true) */
  closeOnSave?: boolean;

  // ─── Styling ───────────────────────────────────────────────
  size?: ModalSize;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tabsClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  saveButtonClassName?: string;
  cancelButtonClassName?: string;
}

export interface UseModalContainerArgs
  extends Pick<
    ModalProps,
    | "open"
    | "onOpenChange"
    | "defaultOpen"
    | "onOpen"
    | "onClose"
    | "onCancel"
    | "closeOnSave"
    | "activeTab"
    | "defaultTab"
    | "onTabChange"
  > {
  firstTabKey?: string;
  onSave?: ModalAction;
  onSubmit?: ModalAction<[values: any]>;
}

export interface ModalFooterProps
  extends Pick<
    ModalProps,
    | "saveText"
    | "loadingText"
    | "cancelText"
    | "hideCancel"
    | "saveDisabled"
    | "footerClassName"
    | "saveButtonClassName"
    | "cancelButtonClassName"
  > {
  pending: boolean;
  isSubmit: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export interface ModalBodyProps {
  loading?: boolean;
  loadingText?: string;
  error?: ReactNode;
  errorClassName?: string;
  children: ReactNode;
}

