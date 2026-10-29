"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useDeleteReviewsModalContainer from "./DeleteReviewsModalContainer";
import { DeleteReviewsModalProps } from "./type";

const DeleteReviewsModal = ({
  reviewIds,
  open,
  onOpenChange,
  onDeleted,
}: DeleteReviewsModalProps) => {
  const { handleDelete } = useDeleteReviewsModalContainer({
    reviewIds,
    onDeleted,
  });

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete reviews?"
      size="sm"
      onSave={handleDelete}
      saveText="Delete"
      loadingText="Deleting..."
      saveButtonClassName="bg-danger-red border-danger-red hover:bg-dark-danger-red hover:text-white"
    >
      <div className="flex items-start gap-4">
        <AlertTriangle className="size-8 shrink-0 text-yellow-600" />
        <p className="text-[1.4rem]! text-gray-700!">
          Are you sure you want to delete the selected reviews?
        </p>
      </div>
    </Modal>
  );
};

export default DeleteReviewsModal;
