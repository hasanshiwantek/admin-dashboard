"use client";

import { Trash } from "lucide-react";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import Table from "@/components/ui/Table/Table";
import { Button } from "@/components/ui/Button";
import useWebPageTableContainer from "./container";
import PageLayout from "@/components/ui/PageLayout";
import { LIST_PATH } from "./[id]/constants";

const TOOLBAR_CONTROL = "!h-13 !py-0 !my-0";

const WebPageTable = () => {
  const {
    webPages,
    loading,
    selectedIds,
    showDeleteModal,
    setShowDeleteModal,
    getDropdownActions,
    handleSelectAll,
    handleSelectOne,
    deleteWebpageHandler,
    confirmDelete,
    router,
    Alert,
    columns,
  } = useWebPageTableContainer();

  return (
    <PageLayout
      title="View Web Pages"
      titleProps={{
        description:
          "Web pages are used to display content that doesn't change often. For example an 'About Us' or a 'Contact Us' page.",
      }}
    >
      <div className="flex flex-col space-y-5">
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            className={`2xl:text-2xl ${TOOLBAR_CONTROL}`}
            onClick={() => router.push(`${LIST_PATH}/add`)}
          >
            Create a Web Page
          </Button>

          <Button
            variant="outline"
            className={`${TOOLBAR_CONTROL}`}
            onClick={deleteWebpageHandler}
          >
            <Trash className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-sm mt-4">
        <Table
          bare
          data={webPages}
          columns={columns}
          getRowId={(page) => page.id}
          loading={loading}
          emptyMessage="No Pages found."
          hideRecordCount
          selectable
          selectAllInHeader
          selectedIds={selectedIds}
          onToggleRow={(id, checked) => handleSelectOne(id, checked)}
          onToggleAll={handleSelectAll}
          actionsColumnWidth="80px"
        />
      </div>

      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        variant="warning"
        title="Delete Webpages?"
        description="Are you sure you want to delete the selected webpages?"
        onConfirm={confirmDelete}
      />

      <Alert />
    </PageLayout>
  );
};

export default WebPageTable;
