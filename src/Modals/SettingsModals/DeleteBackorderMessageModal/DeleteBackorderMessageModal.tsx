"use client";

import Modal from "@/components/Modal/Modal";
import { DeleteBackorderMessageModalProps } from "./type";

const DeleteBackorderMessageModal = ({
  trigger,
  onDelete,
}: DeleteBackorderMessageModalProps) => (
  <Modal
    trigger={trigger}
    title="Delete backorder message"
    size="sm"
    onSave={onDelete}
    saveText="Delete"
    saveButtonClassName="bg-danger-red! border-danger-red! hover:bg-dark-danger-red! hover:text-white!"
  >
    <p className="text-[1.4rem]! text-gray-700!">
      If this message is in use, products using it will fall back to your
      default backorder message after deletion.
    </p>
  </Modal>
);

export default DeleteBackorderMessageModal;
