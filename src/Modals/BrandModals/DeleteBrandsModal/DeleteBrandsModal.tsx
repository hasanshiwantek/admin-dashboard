"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useDeleteBrandsModalContainer from "./DeleteBrandsModalContainer";
import { DeleteBrandsModalProps } from "./type";

const DeleteBrandsModal = ({
  brands,
  open,
  onOpenChange,
  onDeleted,
}: DeleteBrandsModalProps) => {
  const { handleDelete } = useDeleteBrandsModalContainer({ brands, onDeleted });

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={brands.length === 1 ? "Delete brand?" : "Delete brands?"}
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
          {brands.length === 1 ? (
            <strong>{brands[0].name}</strong>
          ) : (
            `these ${brands.length} brands`
          )}
          ? This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteBrandsModal;
