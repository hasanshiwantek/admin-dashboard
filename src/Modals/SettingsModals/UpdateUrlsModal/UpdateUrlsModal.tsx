"use client";

import CheckboxField from "@/components/form/fields/CheckboxField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import InputField from "@/components/form/InputField";
import Modal from "@/components/Modal/Modal";
import { useModal } from "@/components/Modal/ModalContainer";
import {
  UpdateUrlsFormNames,
  updateUrlsCopy,
  updateUrlsScopeOptions,
} from "./constant";
import { UpdateUrlsModalProps } from "./type";
import useUpdateUrlsContainer from "./UpdateUrlsModalContainer";

const UpdateUrlsModal = ({ trigger, section }: UpdateUrlsModalProps) => {
  const { open, modalProps } = useModal();
  const { form, onSubmit } = useUpdateUrlsContainer({ open, section });
  const { title, items, itemLabel } = updateUrlsCopy[section];

  return (
    <Modal
      {...modalProps}
      trigger={trigger}
      title={title}
      size="md"
      isForm
      form={form}
      onSubmit={onSubmit}
      saveText="Update URLs"
      loadingText="Updating..."
      bodyClassName="p-12!"
      titleClassName="text-3xl!"
    >
      <p className="text-[1.4rem]! text-gray-700!">
        To update the URLs for your existing {items}, please choose an option
        from those shown below.
      </p>
      <InputField
        control={form.control}
        name={UpdateUrlsFormNames.Scope}
        layout="vertical"
        Component={RadioGroupField}
        options={updateUrlsScopeOptions(items)}
      />
      <InputField
        control={form.control}
        name={UpdateUrlsFormNames.CreateRedirects}
        layout="vertical"
        Component={CheckboxField}
        text={`Create redirects for old ${itemLabel} URLs (highly recommended)`}
      />
    </Modal>
  );
};

export default UpdateUrlsModal;
