"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useDeleteCurrencyContainer from "./DeleteCurrencyModalContainer";
import { DeleteCurrencyModalProps } from "./type";

const DeleteCurrencyModal = ({
  currency,
  open,
  onOpenChange,
  onDeleted,
}: DeleteCurrencyModalProps) => {
  const { deleting, handleDelete } = useDeleteCurrencyContainer({
    currency,
    onDeleted,
  });

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete currency?"
      size="sm"
      onSave={handleDelete}
      saveText="Delete"
      loadingText="Deleting..."
      loading={deleting}
      saveButtonClassName="bg-danger-red border-danger-red hover:bg-dark-danger-red hover:text-white"
    >
      <div className="flex items-start gap-4">
        <AlertTriangle className="size-8 shrink-0 text-yellow-600" />
        <p className="text-[1.4rem]! text-gray-700!">
          Are you sure you want to delete <strong>{currency.name}</strong>?
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteCurrencyModal;
