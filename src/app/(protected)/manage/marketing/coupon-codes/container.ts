"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  deleteCouponCodes,
  getCouponCodes,
  searchCouponcode,
  toggleCouponEnabled,
} from "@/redux/slices/marketingSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useCouponCodesContainer = () => {
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("10");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { couponCodes, loading, error, deleteLoading } = useAppSelector(
    (state: any) => state.marketingReducer,
  );

  const couponsData = couponCodes?.couponcode?.data || [];
  const totalCount = couponCodes?.couponcode?.total || 0;
  const totalPages = couponCodes?.couponcode?.last_page || 1;

  useEffect(() => {
    dispatch(getCouponCodes());
  }, [dispatch, currentPage, perPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedCoupons([]);
  };

  const handlePerPageChange = (value: string) => {
    setPerPage(value);
    setCurrentPage(1);
    setSelectedCoupons([]);
  };

  const filterCouponHandler = () => {
    if (searchQuery.trim()) {
      dispatch(searchCouponcode({ search: searchQuery, per_page: perPage }));
    } else {
      dispatch(getCouponCodes());
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      filterCouponHandler();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    dispatch(getCouponCodes());
  };

  const handleToggleEnabled = async (coupon: any) => {
    const nextEnabled = !coupon?.enabled;
    try {
      await dispatch(
        toggleCouponEnabled({ id: coupon?.id, enabled: nextEnabled }),
      ).unwrap();
      dispatch(getCouponCodes());
    } catch (error: any) {
      console.error(error || "Failed to update coupon status");
    }
  };

  const handleDeleteCoupon = (id: number) => {
    setDeleteIds([id]);
    setOpenDeleteModal(true);
  };

  const handleDeleteSelected = () => {
    if (selectedCoupons.length === 0) return;
    setDeleteIds(selectedCoupons);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteIds.length === 1) {
        const id = deleteIds[0];
        setDeletingId(id);
        await dispatch(deleteCouponCodes({ id })).unwrap();
        setSelectedCoupons((prev) => prev.filter((cid) => cid !== id));
      } else {
        await Promise.all(
          deleteIds.map((id) => dispatch(deleteCouponCodes({ id })).unwrap()),
        );
        setSelectedCoupons([]);
      }
      dispatch(getCouponCodes());
      setOpenDeleteModal(false);
    } catch (error: any) {
      console.error(error || "Failed to delete coupon code");
    } finally {
      setDeletingId(null);
    }
  };

  const goToEditPage = (id: number) =>
    router.push(`/manage/marketing/coupon-codes/edit/${id}`);

  return {
    couponsData,
    totalCount,
    totalPages,
    loading,
    error,
    deleteLoading,
    selectedCoupons,
    setSelectedCoupons,
    currentPage,
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
    deleteIds,
    deletingId,
    router,
    dispatch,
  };
};