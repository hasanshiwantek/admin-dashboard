"use client";

import InputField from "@/components/form/InputField";
import Modal from "@/components/Modal/Modal";
import { useModal } from "@/components/Modal/ModalContainer";
import { ImageIcon } from "lucide-react";
import useAddMediaFromUrlContainer from "./AddMediaFromUrlModalContainer";
import { AddMediaFromUrlFormNames } from "./constant";
import { AddMediaFromUrlModalProps } from "./type";

const AddMediaFromUrlModal = ({ trigger, onAdd }: AddMediaFromUrlModalProps) => {
  const { open, modalProps } = useModal();
  const { form, previewUrl, onSubmit } = useAddMediaFromUrlContainer({
    open,
    onAdd,
  });

  return (
    <Modal
      {...modalProps}
      trigger={trigger}
      title="Add Image/YouTube Video from URL"
      size="lg"
      isForm
      form={form}
      onSubmit={onSubmit}
      saveText="Add"
    >
      <InputField
        name={AddMediaFromUrlFormNames.Url}
        label="URL"
        layout="vertical"
        placeholder="https://"
        hint="Maximum image size is 8 MB."
        className="max-w-none"
      />

      <div className="flex h-96 items-center justify-center rounded-sm border border-gray-200 bg-muted p-8">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[1.4rem] text-gray-400">
            <ImageIcon className="size-16" />
            Preview
          </div>
        )}
      </div>

      <p className="text-[1.3rem] text-gray-600">
        This API integrates with YouTube. By continuing, you agree to the{" "}
        <a
          href="https://www.youtube.com/t/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          YouTube Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Google Privacy Policy
        </a>
        .
      </p>
    </Modal>
  );
};

export default AddMediaFromUrlModal;
