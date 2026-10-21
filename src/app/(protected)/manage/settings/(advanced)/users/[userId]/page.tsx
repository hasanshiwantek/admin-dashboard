"use client";

import UserFormLayout from "../_components/UserFormLayout";
import { EDIT_USER_DESCRIPTION } from "../constant";
import useEditUserContainer from "./container";

const EditUserPage = () => {
  const { form, permissionGroups, loading, onSubmit, handleCancel } =
    useEditUserContainer();

  return (
    <UserFormLayout
      title="Edit User"
      description={EDIT_USER_DESCRIPTION}
      form={form}
      onSubmit={onSubmit}
      onCancel={handleCancel}
      loading={loading}
      permissionGroups={permissionGroups}
      isEdit
    />
  );
};

export default EditUserPage;
