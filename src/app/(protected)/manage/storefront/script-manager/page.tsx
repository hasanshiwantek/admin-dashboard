"use client";

import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import Table from "@/components/ui/Table/Table";
import scriptColumns from "./column";
import useScriptManagerContainer from "./container";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";

const Page = () => {
  const {
    actions,
    error,
    getScriptRowActions,
    handleDelete,
    keyword,
    loading,
    pageScripts,
    pendingDeleteScript,
    setShowDeleteModal,
    setSort,
    showDeleteModal,
    sort,
  } = useScriptManagerContainer();

  return (
    <PageLayout>
      <PageTitle
        title="Scripts Manager"
        description="Use scripts to automate and enhance the functionality of your
          storefront."
        descriptionClassName="text-2xl!"
        action={actions}
      />
      <div className="bg-white shadow-md rounded-sm">
        <Table
          bare
          data={pageScripts}
          columns={scriptColumns}
          getRowId={(script) => script.id}
          loading={loading}
          error={error}
          emptyMessage={
            keyword ? "No scripts match your search." : "No scripts found."
          }
          recordLabel="scripts"
          selectable={false}
          sort={sort}
          onSortChange={setSort}
          rowActions={getScriptRowActions}
        />
      </div>

      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        variant="warning"
        title="Delete Script?"
        description={`Are you sure you want to delete "${pendingDeleteScript?.script_name}"?`}
        onConfirm={handleDelete}
      />
    </PageLayout>
  );
};

export default Page;
