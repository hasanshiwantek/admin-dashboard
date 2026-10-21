"use client";

import InputField from "@/components/form/InputField";
import Modal from "@/components/Modal/Modal";
import { useModal } from "@/components/Modal/ModalContainer";
import { SETTINGS_TAB } from "../constant";
import { DisplayNameField } from "./constant";
import useShippingQuotesDisplayNameContainer from "./ShippingQuotesDisplayNameModalContainer";
import { ShippingQuotesDisplayNameProps } from "./type";

const ShippingQuotesDisplayNameModal = ({
  trigger,
  methodId,
  onSaved,
}: ShippingQuotesDisplayNameProps) => {
  const { open, modalProps } = useModal();
  const { form, loading, error, onSubmit } =
    useShippingQuotesDisplayNameContainer({ open, methodId, onSaved });

  // The form lives in the "Settings" tab's content
  const settingsPanel = (
    <>
      <InputField
        control={form.control}
        name={DisplayNameField.DisplayName}
        label="Display name"
        required
        layout="vertical"
        containerClassName="mb-10 w-full"
        labelClassName="text-[15px] font-medium text-muted-plum-gray"
        placeholder="Ship on my own/company shipping account (mention shipping account on order comments)"
        className="h-14 max-w-[490px] !font-normal"
      />
    </>
  );

  return (
    <Modal
      {...modalProps}
      trigger={trigger}
      title="Pickup options"
      titleClassName="!text-[20px]"
      tabs={[{ ...SETTINGS_TAB, content: settingsPanel }]}
      size="xl"
      isForm
      form={form}
      onSubmit={onSubmit}
      saveText="Submit"
      loadingText="Saving…"
      contentLoading={loading}
      error={error}
    />
  );
};

export default ShippingQuotesDisplayNameModal;
