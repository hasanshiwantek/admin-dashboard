"use client";

import CategoryDropdown from "@/app/components/products/categories/CategoryDropdown";
import CheckboxField from "@/components/form/fields/CheckboxField";
import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import Modal from "@/components/Modal/Modal";
import { useModal } from "@/components/Modal/ModalContainer";
import useAddCategoryContainer from "./AddCategoryModalContainer";
import { AddCategoryFormNames } from "./constant";
import { AddCategoryModalProps } from "./type";

const AddCategoryModal = ({
  trigger,
  categoryTree,
  onSaved,
}: AddCategoryModalProps) => {
  const { open, modalProps } = useModal();
  const { form, channelOptions, onSubmit } = useAddCategoryContainer({
    open,
    onSaved,
  });

  return (
    <Modal
      {...modalProps}
      trigger={trigger}
      title="Add new category"
      size="sm"
      isForm
      form={form}
      onSubmit={onSubmit}
      saveText="Save and edit"
      className="overflow-visible [&>form]:overflow-visible"
      bodyClassName="overflow-visible"
    >
      <InputField
        name={AddCategoryFormNames.Name}
        label="Display name"
        required
        placeholder="New category"
        layout="vertical"
        className="max-w-full!"
      />
      <InputField
        name={AddCategoryFormNames.Channel}
        label="Channel"
        required
        Component={SelectField}
        options={channelOptions}
        placeholder="Select channel"
        layout="vertical"
        className="max-w-full!"
      />
      <InputField
        name={AddCategoryFormNames.Parent}
        label="Parent category"
        Component={CategoryDropdown}
        categoryData={categoryTree}
        className="max-w-full"
        layout="vertical"
        hint="Leave empty to add to the root category"
      />
      <InputField
        name={AddCategoryFormNames.IsVisible}
        text="Enable visibility"
        Component={CheckboxField}
        hint="Makes new categories immediately available on the storefront."
        layout="vertical"
      />
    </Modal>
  );
};

export default AddCategoryModal;
