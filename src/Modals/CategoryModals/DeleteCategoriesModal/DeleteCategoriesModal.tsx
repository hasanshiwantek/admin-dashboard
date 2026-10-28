"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useDeleteCategoriesModalContainer from "./DeleteCategoriesModalContainer";
import { DeleteCategoriesModalProps } from "./type";

const DeleteCategoriesModal = ({
  categories,
  open,
  onOpenChange,
  onDeleted,
}: DeleteCategoriesModalProps) => {
  const { handleDelete } = useDeleteCategoriesModalContainer({
    categories,
    onDeleted,
  });

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={categories.length === 1 ? "Delete category?" : "Delete categories?"}
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
          {categories.length === 1 ? (
            <strong>{categories[0].name}</strong>
          ) : (
            `these ${categories.length} categories`
          )}
          ?
        </p>
      </div>
    </Modal>
  );
};

export default DeleteCategoriesModal;
