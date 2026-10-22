"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useResetBasicTaxModalContainer from "./ResetBasicTaxModalContainer";
import { ResetBasicTaxModalProps } from "./type";

const ResetBasicTaxModal = ({ trigger, onReset }: ResetBasicTaxModalProps) => {
  const { handleReset } = useResetBasicTaxModalContainer({ onReset });

  return (
    <Modal
      trigger={trigger}
      title="Reset basic tax configuration?"
      size="sm"
      onSave={handleReset}
      saveText="Reset"
      loadingText="Resetting..."
      saveButtonClassName="bg-danger-red border-danger-red hover:bg-dark-danger-red hover:text-white"
    >
      <div className="flex items-start gap-4">
        <AlertTriangle className="size-8 shrink-0 text-yellow-600" />
        <p className="text-[1.4rem]! text-gray-700!">
          This clears your tax classes, rates and zones and restores the
          default values. This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default ResetBasicTaxModal;
