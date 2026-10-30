export interface DeleteReviewsModalProps {
  reviewIds: number[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after the reviews are deleted, e.g. to refresh the list */
  onDeleted?: () => void;
}
