export interface UnsavedChangesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Leave the page and drop the changes */
  onLeave: () => void;
  /** Stay on the page */
  onStay: () => void;
}
