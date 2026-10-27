"use client";

import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import Modal from "@/components/Modal/Modal";
import { useModal } from "@/components/Modal/ModalContainer";
import useAddCurrencyContainer from "./AddCurrencyModalContainer";
import { AddCurrencyFormNames } from "./constant";
import { AddCurrencyModalProps } from "./type";

const AddCurrencyModal = ({ trigger, existingCodes }: AddCurrencyModalProps) => {
  const { open, modalProps } = useModal();
  const { form, options, loading, onSubmit } = useAddCurrencyContainer({
    open,
    existingCodes,
  });

  return (
    <Modal
      {...modalProps}
      trigger={trigger}
      title="Add Currency"
      size="md"
      isForm
      form={form}
      onSubmit={onSubmit}
      saveText="Next"
      saveDisabled={loading}
      className="overflow-visible [&>form]:overflow-visible"
      bodyClassName="overflow-visible"
      titleClassName="font-semibold! text-4xl!"
    >
      <InputField
        name={AddCurrencyFormNames.Code}
        label="Currency code"
        layout="vertical"
        Component={SelectField}
        options={options}
        valueKey="code"
        labelKey="label"
        loading={loading}
        loadingText="Loading currencies..."
        placeholder="Choose currency"
        className="max-w-none"
        labelClassName="font-bold!"
      />
    </Modal>
  );
};

export default AddCurrencyModal;
