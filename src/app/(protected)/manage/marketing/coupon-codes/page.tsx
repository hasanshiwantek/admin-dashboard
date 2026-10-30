"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import Table from "@/components/ui/Table/Table";
import { Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { IoFilterOutline } from "react-icons/io5";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import { useCouponCodesContainer } from "./container";
import CouponColumns from "./Column";

import PageTitle from "@/components/ui/PageTitle";
import { CouponAddRoute } from "./constant";

const Page = () => {
  const {
    couponsData,
    loading,
    error,
    deleteLoading,
    selectedCoupons,

    currentPage,
    totalPages,
    perPage,
    handlePageChange,
    handlePerPageChange,
    searchQuery,
    setSearchQuery,
    filterCouponHandler,
    handleSearchKeyPress,
    handleClearSearch,
    handleToggleEnabled,
    handleDeleteCoupon,
    handleDeleteSelected,
    confirmDelete,
    goToEditPage,
    openDeleteModal,
    setOpenDeleteModal,
    setSelectedCoupons,
    deleteIds,
    deletingId,
    totalCount,
    handleAction
  } = useCouponCodesContainer();

  const columns = CouponColumns({
    goToEditPage,
    handleToggleEnabled,
    handleDeleteCoupon,
    deletingId,
    handleAction
  });

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading coupons
      </div>
    );
  }

  const topActions = (
  <div className="flex items-center gap-8 px-6 py-4 border-b">
    <Link  href={CouponAddRoute}>
      <Button variant="outline" className="btn-outline-primary h-full! text-[14px]! rounded-none border-0 border-l px-3">
        Create a coupon code
      </Button>
    </Link>
    <Button
      variant="outline"
      className="btn-outline-primary h-full rounded-none border-0 border-l px-3"
      disabled={selectedCoupons.length === 0 || deleteLoading}
      onClick={handleDeleteSelected}
    >
      {deleteLoading ? (
        <Loader2 className="h-8! w-8! animate-spin" />
      ) : (
        <Trash2 className="h-8! w-8! fill-blue-600" />
      )}
    </Button>

    <div className="flex items-center border rounded 2xl:h-[37.98px]">
      <Input
        className="border-0 focus:ring-0 2xl:!text-2xl"
        placeholder="Filter by Keyword"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearchKeyPress}
      />
      {searchQuery && (
        <Button
          onClick={handleClearSearch}
          className="px-2 text-gray-400 btn-outline-primary h-full rounded-none border-0 border-l  hover:text-gray-600"
          type="button"
        >
          ×
        </Button>
      )}
      <Button
        variant="outline"
        className="btn-outline-primary h-full rounded-none"
        onClick={filterCouponHandler}
      >
        <IoFilterOutline />
      </Button>
    </div>
  </div>
);

  return (
    <div className="p-10">
      {/* Info Banner */}
      <div className="bg-amber-50 border-l-4 border-yellow-500 px-6 py-4">
        <p className="text-xl text-gray-700">
          Create a greater variety of coupon types including "buy one, get one"
          and "free gift with purchase" using the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            standard promotions editor
          </a>
        </p>
      </div>

      {/* Header */}
      <div className="px-6 py-6">
        <PageTitle
          title="Coupon codes"
          titleClassName="font-light! 2xl:text-5xl! mb-2"
          description={
            <p className="text-gray-600">
              Coupon codes allow you to provide customers with discounts on
              products available for purchase from your store.
            </p>
          }
          hideActionButton
        />
      </div>

      <div className="px-6 pb-6">
        <div className="bg-white border rounded-lg">
          {topActions}

          <Table
            data={couponsData}
            columns={columns}
            getRowId={(coupon) => {
              console.log("getRowId:", coupon.id, typeof coupon.id);
              return coupon.id;
            }}
            loading={loading}
            emptyMessage="No coupon codes found."
            selectAllInHeader
            hideRecordCount
            selectedIds={selectedCoupons}
            onToggleRow={(id, checked) => {
              const numId = Number(id);
              setSelectedCoupons((prev) =>
                checked
                  ? [...prev, numId]
                  : prev.filter((cid) => cid !== numId),
              );
            }}
            onToggleAll={(checked, allIds) => {
              setSelectedCoupons(checked ? allIds.map(Number) : []);
            }}
            pagination={{
              currentPage,
              totalPages,
              perPage,
              total: totalCount,
              onPageChange: handlePageChange,
              onPerPageChange: handlePerPageChange,
            }}
          />
        </div>
      </div>

      <ConfirmationModal
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        variant="warning"
        title="Delete coupon?"
        description={
          deleteIds.length > 1
            ? `Are you sure you want to delete ${deleteIds.length} coupon code(s)?`
            : "Are you sure you want to delete this coupon code?"
        }
        loading={deleteLoading}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Page;
