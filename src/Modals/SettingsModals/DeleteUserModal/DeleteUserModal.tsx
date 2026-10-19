"use client";

import Modal from "@/components/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import useDeleteUserModalContainer from "./DeleteUserModalContainer";
import { DeleteUserModalProps } from "./type";

const DeleteUserModal = ({ user, trigger, onDeleted }: DeleteUserModalProps) => {
  const { handleDelete } = useDeleteUserModalContainer({ user, onDeleted });

  return (
    <Modal
      trigger={trigger}
      title="Delete user?"
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
          <strong>{user.name || "this user"}</strong>? This action cannot be
          undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
