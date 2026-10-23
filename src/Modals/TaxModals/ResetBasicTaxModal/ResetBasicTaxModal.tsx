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
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="size-24 shrink-0 text-danger-red" />
        <p className="text-[1.4rem]! text-gray-700!">
          This will reset your manual tax configuration to default values. No taxes will be collected unless you have a tax provider service enabled.
        </p>
      </div>
    </Modal>
  );
};

export default ResetBasicTaxModal;
