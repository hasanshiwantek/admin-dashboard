export interface DeleteBrandsModalProps {
  brands: { id: number; name: string }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after the brands are deleted, e.g. to refresh the list */
  onDeleted?: () => void;
}
