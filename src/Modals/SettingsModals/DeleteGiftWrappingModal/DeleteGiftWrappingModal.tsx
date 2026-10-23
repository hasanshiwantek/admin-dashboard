"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useDeleteGiftWrappingContainer from "./DeleteGiftWrappingModalContainer";
import { DeleteGiftWrappingModalProps } from "./type";

const DeleteGiftWrappingModal = ({
  ids,
  trigger,
  open,
  onOpenChange,
  onDeleted,
}: DeleteGiftWrappingModalProps) => {
  const { handleDelete, deleting } = useDeleteGiftWrappingContainer({
    ids,
    onDeleted,
  });
  const many = ids.length > 1;

  return (
    <Modal
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title={many ? "Delete gift wrapping options?" : "Delete gift wrapping option?"}
      size="sm"
      onSave={handleDelete}
      saveText="Delete"
      loadingText="Deleting..."
      loading={deleting}
      saveButtonClassName="bg-danger-red! border-danger-red! hover:bg-dark-danger-red! hover:text-white!"
    >
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="size-24 shrink-0 text-danger-red" />
        <p className="text-[1.4rem]! text-gray-700!">
          {many
            ? `Are you sure you want to delete these ${ids.length} gift wrapping options?`
            : "Are you sure you want to delete this gift wrapping option?"}{" "}
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteGiftWrappingModal;
