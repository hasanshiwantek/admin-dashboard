"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useDeletePickupMethodModalContainer from "./DeletePickupMethodModalContainer";
import { DeletePickupMethodModalProps } from "./type";

const DeletePickupMethodModal = ({
  pickupMethod,
  trigger,
  open,
  onOpenChange,
  onDeleted,
}: DeletePickupMethodModalProps) => {
  const { handleDelete } = useDeletePickupMethodModalContainer({
    pickupMethod,
    onDeleted,
  });

  return (
    <Modal
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title="Delete pick up method?"
      size="sm"
      onSave={handleDelete}
      saveText="Delete"
      loadingText="Deleting..."
      saveButtonClassName="bg-danger-red border-danger-red hover:bg-dark-danger-red hover:text-white"
    >
      <div className="flex items-start gap-4">
        <AlertTriangle className="size-8 shrink-0 text-yellow-600" />
        <p className="text-[1.4rem]! text-gray-700!">
          Are you sure you want to delete <strong>{pickupMethod.name}</strong>?
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeletePickupMethodModal;
