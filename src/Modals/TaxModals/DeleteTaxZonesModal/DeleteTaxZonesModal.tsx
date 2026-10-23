"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useDeleteTaxZonesModalContainer from "./DeleteTaxZonesModalContainer";
import { DeleteTaxZonesModalProps } from "./type";

const DeleteTaxZonesModal = ({
  zones,
  trigger,
  open,
  onOpenChange,
  onDeleted,
}: DeleteTaxZonesModalProps) => {
  const { handleDelete } = useDeleteTaxZonesModalContainer({
    zones,
    onDeleted,
  });
  const single = zones.length === 1;

  return (
    <Modal
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title={single ? "Delete tax zone?" : "Delete tax zones?"}
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
          {single ? (
            <strong>{zones[0].name}</strong>
          ) : (
            <strong>{zones.length} tax zones</strong>
          )}{" "}
          and their tax rates? This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteTaxZonesModal;
