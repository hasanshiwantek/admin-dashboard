"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useAlert } from "@/hooks/useAlert";
import {
  deleteWebPage,
  getWebPages,
  updateNavigation,
} from "@/redux/slices/storefrontSlice";
import { refetchWebpages } from "@/lib/storeFrontUtils";
import { getWebPageColumns } from "./WebPageColumns";

const useWebPageTableContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showAlert, Alert } = useAlert();

  const webPages =
    useAppSelector((state: any) => state.storefront.webPages) ?? [];
  const loading = useAppSelector((state: any) => state.storefront.loading);

  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getWebPages());
  }, [dispatch]);

  const getDropdownActions = (page: any) => [
    {
      label: "Edit",
      onClick: () =>
        router.push(`/manage/storefront/web-pages/edit/${page.id}`),
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? webPages.map((p: any) => p.id) : []);
  };

  const handleSelectOne = (id: string | number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id),
    );
  };

  const deleteWebpageHandler = () => {
    if (selectedIds.length === 0) {
      showAlert({
        title: "No Webpage Selected",
        message: "Please select at least one Webpage before deleting.",
      });
      return;
    }
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const resultAction = await dispatch(deleteWebPage({ id: selectedIds }));

      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        setSelectedIds([]);
        setTimeout(() => refetchWebpages(dispatch), 700);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const toggleVisibility = (page: any) => {
    dispatch(
      updateNavigation({
        id: page.id,
        data: { isPageVisible: !page.isPageVisible },
      }),
    )
      .unwrap()
      .then(() => dispatch(getWebPages()));
  };
  const columns = useMemo(
    () => getWebPageColumns(toggleVisibility),
    [toggleVisibility],
  );
  return {
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
    toggleVisibility,
    router,
    Alert,
    columns
  };
};

export default useWebPageTableContainer;
