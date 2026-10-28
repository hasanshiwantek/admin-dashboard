export interface DeleteCategoriesModalProps {
  categories: { id: number; name: string }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after the categories are deleted, e.g. to refresh or leave the page */
  onDeleted?: () => void;
}
