"use client";
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import Table from "@/components/ui/Table/Table";
import useBlogTableContainer from "./useBlogTableContainer";
import { getSelectedStore } from "@/utils/storage";
import PageTitle from "@/components/ui/PageTitle";

export default function BlogTable() {
  const {
    posts,
    loading,
    error,
    openDeleteModal,
    setOpenDeleteModal,
    confirmDelete,
    getDropdownActions,
    Alert,
    columns,
  } = useBlogTableContainer();

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
        <PageTitle title="Blog" hideActionButton />
        {getSelectedStore()?.baseUrl && (
          <Link
            href={`${getSelectedStore()?.baseUrl}/blogs` || "#"}
            target="_blank"
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium 2xl:!text-2xl"
          >
            View blog <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="bg-white rounded-md shadow-sm p-10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Link href="/manage/storefront/blog/add">
            <button className="btn-outline-primary flex items-center gap-2">
              <Plus className="h-5 w-5" />
            </button>
          </Link>
        </div>

        {/* Generic Table */}
        <Table
          bare
          data={posts}
          columns={columns}
          getRowId={(post) => post.id}
          loading={loading}
          error={error}
          emptyMessage="No blog posts found."
          hideRecordCount
          rowActions={getDropdownActions}
          selectable={false}
        />
      </div>

      <ConfirmationModal
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        variant="warning"
        title="Delete blog?"
        description="Are you sure you want to delete this blog?"
        onConfirm={confirmDelete}
      />

      <Alert />
    </div>
  );
}
