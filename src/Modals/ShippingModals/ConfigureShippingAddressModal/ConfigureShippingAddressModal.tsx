"use client";

import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import Modal from "@/components/Modal/Modal";
import { useModal } from "@/components/Modal/ModalContainer";
import useConfigureShippingAddressContainer from "./ConfigureShippingAddressModalContainer";
import {
  countryOptions,
  FIELD_CLASS,
  LABEL_CLASS,
  ShippingAddressField,
  stateOptions,
} from "./constant";
import { ConfigureShippingAddressProps } from "./type";

const ConfigureShippingAddressModal = ({
  trigger,
  onSaved,
}: ConfigureShippingAddressProps) => {
  const { open, modalProps } = useModal();
  const { form, loading, onSubmit } = useConfigureShippingAddressContainer({
    open,
    onSaved,
  });

  // Shared props for every field in this modal
  const fieldProps = {
    control: form.control,
    layout: "vertical" as const,
    labelClassName: LABEL_CLASS,
    className: FIELD_CLASS,
  };

  return (
    <Modal
      {...modalProps}
      trigger={trigger}
      title="Configure shipping address"
      size="lg"
      isForm
      form={form}
      onSubmit={onSubmit}
      saveText="Update"
      loadingText="Updating..."
      loading={loading}
      bodyClassName="no-scrollbar"
    >
      <InputField
        {...fieldProps}
        name={ShippingAddressField.AddressLine1}
        label="Address line 1"
        required
      />
      <InputField
        {...fieldProps}
        name={ShippingAddressField.AddressLine2}
        label="Address line 2 (optional)"
      />
      <InputField
        {...fieldProps}
        name={ShippingAddressField.City}
        label="City"
        required
      />
      <InputField
        {...fieldProps}
        name={ShippingAddressField.PostalCode}
        label="Postal code"
        required
      />
      <InputField
        {...fieldProps}
        name={ShippingAddressField.Country}
        label="Country"
        Component={SelectField}
        options={countryOptions}
        placeholder="Select country"
      />
      <InputField
        {...fieldProps}
        name={ShippingAddressField.State}
        label="State"
        Component={SelectField}
        options={stateOptions}
        placeholder="Select state"
      />
      <InputField
        {...fieldProps}
        name={ShippingAddressField.PhoneNumber}
        label="Phone number (optional)"
        type="tel"
      />
    </Modal>
  );
};

export default ConfigureShippingAddressModal;
