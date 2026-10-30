export interface PreviewReviewModalProps {
  /** The review to show; the modal loads it when it opens */
  reviewId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
