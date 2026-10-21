"use client";

import PageLayout from "@/components/ui/PageLayout";
import Table from "@/components/ui/Table/Table";
import { ADVANCED_TITLE_PROPS, SETTINGS_ROUTE } from "../constant";
import { USERS_DESCRIPTION } from "./constant";
import useUsersPageContainer from "./container";

const UsersPage = () => {
  const { users, loading, columns, handleAddUser } = useUsersPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="View Users"
      titleProps={{
        description: USERS_DESCRIPTION,
        buttonText: "Add user",
        onButtonClick: handleAddUser,
        ...ADVANCED_TITLE_PROPS,
      }}
    >
      <Table
        data={users}
        columns={columns}
        getRowId={(user) => user.id}
        loading={loading}
        emptyMessage="No users found."
        selectable={false}
        hideRecordCount
      />
    </PageLayout>
  );
};

export default UsersPage;
