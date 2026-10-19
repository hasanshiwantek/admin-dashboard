"use client";

import UserFormLayout from "../_components/UserFormLayout";
import { ADD_USER_DESCRIPTION } from "../constant";
import useAddUserContainer from "./container";

const AddUserPage = () => {
  const { form, permissionGroups, loading, onSubmit, handleCancel } =
    useAddUserContainer();

  return (
    <UserFormLayout
      title="Create a User Account"
      description={ADD_USER_DESCRIPTION}
      form={form}
      onSubmit={onSubmit}
      onCancel={handleCancel}
      loading={loading}
      permissionGroups={permissionGroups}
    />
  );
};

export default AddUserPage;
