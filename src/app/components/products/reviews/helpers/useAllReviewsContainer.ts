"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useAlert } from "@/hooks/useAlert";
import {
  fetchAllReviews,
  approveReview,
  disapproveReview,
  deleteReview,
} from "@/redux/slices/reviewSlice";
import { getReviewColumns } from "./ReviewColumns";
import { getSelectedStore } from "@/utils/storage";

const useAllReviewsContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showAlert, Alert } = useAlert();

  const { reviews, loading, error, pagination } = useAppSelector(
    (state: any) => state.review,
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllReviews({ page: currentPage, pageSize: Number(perPage) }));
  }, [currentPage, perPage, dispatch]);

  const totalPages = pagination?.lastPage || 1;

  const filteredReviews = useMemo(() => {
    const list = reviews || [];
    if (!keyword.trim()) return list;
    const kw = keyword.toLowerCase();
    return list.filter(
      (r: any) =>
        r.productName?.toLowerCase().includes(kw) ||
        r.postedBy?.toLowerCase().includes(kw) ||
        r.status?.toLowerCase().includes(kw) ||
        r?.product?.name?.toLowerCase().includes(kw),
    );
  }, [reviews, keyword]);

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filteredReviews.map((r: any) => r.id) : []);
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id),
    );
  };

  const handleDeleteSelected = () => {
    if (!selectedIds.length) {
      showAlert({
        title: "No Reviews Selected",
        message: "Please select at least one review.",
      });
      return;
    }
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteReview({ ids: selectedIds }));
    dispatch(fetchAllReviews({ page: currentPage, pageSize: Number(perPage) }));
    setSelectedIds([]);
    setShowDeleteModal(false);
  };

  const handleApproveSelected = async () => {
    if (!selectedIds.length) return;
    await dispatch(approveReview({ ids: selectedIds, status: "approved" }));
    dispatch(fetchAllReviews({ page: currentPage, pageSize: Number(perPage) }));
    setSelectedIds([]);
  };

  const handleDisapproveSelected = async () => {
    if (!selectedIds.length) return;
    await dispatch(
      disapproveReview({ ids: selectedIds, status: "disapproved" }),
    );
    dispatch(fetchAllReviews({ page: currentPage, pageSize: Number(perPage) }));
    setSelectedIds([]);
  };

  const getRowActions = (review: any) => [
    {
      label: "Preview",
      onClick: () => {
        window.open(
          `/manage/products/reviews/preview/${review.id}`,
          "PreviewReview",
          "width=700,height=500,scrollbars=yes,resizable=yes",
        );
      },
    },
    {
      label: "Edit",
      onClick: () => router.push(`/manage/products/reviews/edit/${review.id}`),
    },
  ];

  const handleProductClick = (review: any) => {
    const selectedStore = getSelectedStore();
    if (selectedStore?.baseUrl) {
      const url = review?.product?.product_url || "";
      const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
      window.open(`${selectedStore.baseUrl}${cleanUrl}`, "_blank");
    } else {
      showAlert({
        title: "Store or Product Not Found",
        message: "Store URL or Product SKU not found.",
      });
    }
  };
  const columns = useMemo(
    () => getReviewColumns(handleProductClick),
    [handleProductClick],
  );
  return {
    filteredReviews,
    loading,
    error,
    selectedIds,
    keyword,
    setKeyword,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    totalPages,
    showDeleteModal,
    setShowDeleteModal,
    handleSelectAll,
    handleSelectOne,
    handleDeleteSelected,
    confirmDelete,
    handleApproveSelected,
    handleDisapproveSelected,
    getRowActions,
    handleProductClick,
    Alert,
    columns,
  };
};

export default useAllReviewsContainer;
