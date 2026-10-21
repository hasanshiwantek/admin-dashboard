"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useAlert } from "@/hooks/useAlert";
import { deleteBlog, fetchBlogs } from "@/redux/slices/storefrontSlice";
import { refetchBlogs } from "@/lib/storeFrontUtils";
import { getSelectedStore } from "@/utils/storage";
import { getBlogColumns } from "./BlogColumns";

const useBlogTableContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showAlert, Alert } = useAlert();
  const columns = useMemo(() => getBlogColumns(), []);

  const { blogs, loading, error } = useAppSelector(
    (state: any) => state.storefront,
  );

  const posts = useMemo(() => blogs?.data ?? [], [blogs?.data]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletePost, setDeletePost] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const getDropdownActions = (post: any) => [
    {
      label: "View",
      onClick: () => {
        const selectedStore = getSelectedStore();
        if (selectedStore?.baseUrl && post?.slug) {
          window.open(`${selectedStore?.baseUrl}/blogs/${post.slug}`, "_blank");
        } else {
          showAlert({
            title: "Store or Blog Not Found",
            message: "Store URL or blog not found.",
          });
        }
      },
    },
    {
      label: "Edit",
      onClick: () => router.push(`/manage/storefront/blog/edit/${post.id}`),
    },
    {
      label: "Delete",
      onClick: () => {
        setDeletePost(post);
        setOpenDeleteModal(true);
      },
    },
  ];

  const confirmDelete = async () => {
    if (!deletePost?.id) return;

    try {
      const resultAction = await dispatch(deleteBlog({ id: deletePost.id }));

      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        setOpenDeleteModal(false);
        setTimeout(() => refetchBlogs(dispatch), 700);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    posts,
    loading,
    error,
    openDeleteModal,
    setOpenDeleteModal,
    confirmDelete,
    getDropdownActions,
    router,
    Alert,
    columns
  };
};

export default useBlogTableContainer;
