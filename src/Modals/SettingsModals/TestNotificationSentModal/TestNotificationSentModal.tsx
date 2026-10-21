"use client";

import Modal from "@/components/Modal/Modal";
import { CircleCheck } from "lucide-react";
import { TestNotificationSentModalProps } from "./type";

const TestNotificationSentModal = ({
  email,
  onClose,
}: TestNotificationSentModalProps) => (
  <Modal
    open={!!email}
    onOpenChange={(open) => !open && onClose()}
    title="Test Email Order Notification"
    size="sm"
    saveText="Close"
    hideCancel
  >
    <div className="flex flex-col items-center gap-4">
      <CircleCheck className="size-24 shrink-0 text-green-600" />
      <p className="text-[1.4rem]! text-gray-700!">
        A sample email message has been sent to{" "}
        <strong className="italic">{email}</strong>. It should appear in your
        inbox within the next minute or two.
      </p>
    </div>
  </Modal>
);

export default TestNotificationSentModal;
