"use client";

import Spinner from "@/app/components/loader/Spinner";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import PageLayout from "@/components/ui/PageLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/lib/utils";
import AddCategoryModal from "@/Modals/CategoryModals/AddCategoryModal/AddCategoryModal";
import DeleteCategoriesModal from "@/Modals/CategoryModals/DeleteCategoriesModal/DeleteCategoriesModal";
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Plus } from "lucide-react";
import CategoryRootDropZone from "./_components/CategoryRootDropZone";
import CategoryRow from "./_components/CategoryRow";
import CategorySearch from "./_components/CategorySearch";
import useCategoriesPageContainer from "./container";

const CategoriesPage = () => {
  const {
    categories,
    loading,
    refreshing,
    selectedIds,
    allSelected,
    handleSelectAll,
    handleToggleSelect,
    expandedIds,
    handleToggleExpand,
    searchPick,
    handleSearchPick,
    handleClearSearch,
    handleBulkVisibility,
    handleDeleteSelected,
    handleToggleVisibility,
    handleCategoryAction,
    sensors,
    draggingCategory,
    blockedDropIds,
    rootDropDisabled,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
    deleteTargets,
    deleteOpen,
    setDeleteOpen,
    handleDeleted,
    refresh,
  } = useCategoriesPageContainer();

  return (
    <PageLayout
      title="Product Categories"
      titleProps={{
        action: (
          <AddCategoryModal
            categoryTree={categories}
            onSaved={refresh}
            trigger={
              <Button
                type="button"
                variant="primary"
                size="xl"
                className="flex items-center gap-2"
              >
                <Plus className="h-6! w-6!" /> Add new
              </Button>
            }
          />
        ),
      }}
    >
      <div className="flex flex-col gap-5 bg-white p-6">
        <CategorySearch
          categoryTree={categories}
          value={searchPick}
          onChange={handleSearchPick}
          onClear={handleClearSearch}
        />

        <div className="flex items-center gap-4">
          <Checkbox
            aria-label="Select all categories"
            checked={allSelected}
            onCheckedChange={(checked) => handleSelectAll(checked === true)}
          />
          <Button
            variant="outline"
            size="md"
            type="button"
            onClick={() => handleBulkVisibility(true)}
          >
            Enable Visibility
          </Button>
          <Button
            variant="outline"
            size="md"
            type="button"
            onClick={() => handleBulkVisibility(false)}
          >
            Disable Visibility
          </Button>
          <Button
            variant="outline"
            size="md"
            type="button"
            onClick={handleDeleteSelected}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="relative">
        <Table className={cn(refreshing && LOADING_DIM_CLASS)}>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead />
              <TableHead>Name</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Sub</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <DndContext
            sensors={sensors}
            modifiers={[restrictToWindowEdges]}
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <TableBody>
              {draggingCategory && (
                <CategoryRootDropZone disabled={rootDropDisabled} />
              )}
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : (
                // Rows can't sit inside ListRenderer's wrapper divs in a table body
                categories.map((category) => (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    selectedIds={selectedIds}
                    expandedIds={expandedIds}
                    blockedDropIds={blockedDropIds}
                    onToggleSelect={handleToggleSelect}
                    onToggleExpand={handleToggleExpand}
                    onToggleVisibility={handleToggleVisibility}
                    onAction={handleCategoryAction}
                  />
                ))
              )}
            </TableBody>

            <DragOverlay>
              {draggingCategory && (
                <div className="rounded-md border bg-white p-3 shadow-xl">
                  {draggingCategory.name}
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </Table>
        {refreshing && <LoadingOverlay text="Updating..." />}
      </div>

      <DeleteCategoriesModal
        categories={deleteTargets}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={handleDeleted}
      />
    </PageLayout>
  );
};

export default CategoriesPage;
