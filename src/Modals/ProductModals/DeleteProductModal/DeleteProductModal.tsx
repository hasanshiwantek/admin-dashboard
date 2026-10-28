"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useDeleteProductModalContainer from "./DeleteProductModalContainer";
import { DeleteProductModalProps } from "./type";

const DeleteProductModal = ({
  products,
  trigger,
  open,
  onOpenChange,
  onDeleted,
}: DeleteProductModalProps) => {
  const { handleDelete } = useDeleteProductModalContainer({
    products,
    onDeleted,
  });

  return (
    <Modal
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title={products.length === 1 ? "Delete product?" : "Delete products?"}
      size="sm"
      onSave={handleDelete}
      saveText="Delete"
      loadingText="Deleting..."
      saveButtonClassName="bg-danger-red border-danger-red hover:bg-dark-danger-red hover:text-white"
    >
      <div className="flex items-start gap-4">
        <AlertTriangle className="size-8 shrink-0 text-yellow-600" />
        <p className="text-[1.4rem]! text-gray-700!">
          Are you sure you want to delete{" "}
          {products.length === 1 ? (
            <strong>{products[0].name}</strong>
          ) : (
            `these ${products.length} products`
          )}
          ? This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
