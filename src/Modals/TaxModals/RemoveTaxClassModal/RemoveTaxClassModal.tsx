"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useRemoveTaxClassModalContainer from "./RemoveTaxClassModalContainer";
import { RemoveTaxClassModalProps } from "./type";

const RemoveTaxClassModal = ({ trigger, onRemove }: RemoveTaxClassModalProps) => {
  const { handleRemove } = useRemoveTaxClassModalContainer({ onRemove });

  return (
    <Modal
      trigger={trigger}
      title="Remove tax class?"
      size="sm"
      onSave={handleRemove}
      saveText="Remove"
      saveButtonClassName="bg-danger-red! border-danger-red! hover:bg-dark-danger-red! hover:text-white!"
    >
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="size-24 shrink-0 text-danger-red" />
        <p className="text-[1.4rem]! text-gray-700!">
          Removing this tax class will also remove it from all zones using this
          tax class.
        </p>
      </div>
    </Modal>
  );
};

export default RemoveTaxClassModal;
