export interface DeleteCurrencyModalProps {
  currency: { id: number; name: string };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Called after the currency is deleted, e.g. to refresh the list */
  onDeleted?: () => void;
}
