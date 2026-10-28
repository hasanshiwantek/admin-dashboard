"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import DeleteCategoriesModal from "@/Modals/CategoryModals/DeleteCategoriesModal/DeleteCategoriesModal";
import CategoryFormFields from "../_components/CategoryFormFields";
import CategoryFormHeader from "../_components/CategoryFormHeader";
import useCategoryFormPageContainer from "./container";

const CategoryFormPage = () => {
  const {
    form,
    record,
    title,
    loading,
    saving,
    categoryTree,
    channelOptions,
    pager,
    categoryActions,
    handleCategoryAction,
    handleNameChange,
    handleSlugChange,
    handleResetSlug,
    deleteOpen,
    setDeleteOpen,
    handleDeleted,
    onSubmit,
    handleCancel,
  } = useCategoryFormPageContainer();

  return (
    <PageLayout>
      <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-4">
        <CategoryFormHeader
          title={title}
          pager={pager}
          record={record}
          actions={categoryActions}
          onAction={handleCategoryAction}
        />

        <Form
          form={form}
          onSubmit={onSubmit}
          bodyClassName="relative gap-8 rounded-none border-0 bg-transparent p-0"
          footer={{
            submitText: "Save",
            loadingText: "Saving...",
            onCancel: handleCancel,
            loading: saving,
            disabled: loading,
          }}
        >
          <div
            className={cn(
              "flex flex-col gap-8 transition-opacity duration-200",
              loading && LOADING_DIM_CLASS,
            )}
          >
            <CategoryFormFields
              categoryTree={categoryTree}
              channelOptions={channelOptions}
              onNameChange={handleNameChange}
              onSlugChange={handleSlugChange}
              onResetSlug={handleResetSlug}
            />
          </div>
          {loading && <LoadingOverlay />}
        </Form>
      </div>

      {record && (
        <DeleteCategoriesModal
          categories={[{ id: record.id, name: record.name }]}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onDeleted={handleDeleted}
        />
      )}
    </PageLayout>
  );
};

export default CategoryFormPage;
