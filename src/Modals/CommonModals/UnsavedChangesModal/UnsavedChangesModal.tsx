"use client";

import Modal from "@/components/Modal/Modal";
import { UnsavedChangesModalProps } from "./type";

// Asks before leaving a form with unsaved changes; pair with useUnsavedChangesGuard
const UnsavedChangesModal = ({
  open,
  onOpenChange,
  onLeave,
  onStay,
}: UnsavedChangesModalProps) => (
  <Modal
    open={open}
    onOpenChange={(next) => {
      if (!next) onStay();
      onOpenChange(next);
    }}
    title="Leave page?"
    size="sm"
    onSave={onLeave}
    closeOnSave={false}
    saveText="Leave"
    cancelText="Stay"
  >
    <p className="text-[1.4rem]! text-gray-700!">
      Changes you made may not be saved.
    </p>
  </Modal>
);

export default UnsavedChangesModal;
