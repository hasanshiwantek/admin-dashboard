"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  getEmailMarketing,
  createEmailMarketing,
  deleteAllSubscribers,
  exportSubscribers,
} from "@/redux/slices/marketingSlice";
import { errorMessage, successMessage } from "@/utils/message";
import {
  EmailMarketingFormNames,
  EmailMarketingGeneralSettingsDefaultValues,
} from "./constants";
import { EmailMarketingGeneralSettings } from "./types";

const useEmailMarketingContainer = () => {
  const dispatch = useAppDispatch();
  const { emailMarketing, loading, error } = useAppSelector(
    (state: any) => state.marketingReducer,
  );

  // General Settings form
  const form = useForm<EmailMarketingGeneralSettings>({
    defaultValues: EmailMarketingGeneralSettingsDefaultValues,
  });
  const { watch, reset } = form;

  const [allowNewsletterSubscriptions, showNewsletterSummary] = watch([
    EmailMarketingFormNames.AllowNewsletterSubscriptions,
    EmailMarketingFormNames.ShowNewsletterSummary,
  ]);

  // Subscriber
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(getEmailMarketing());
  }, [dispatch]);

  useEffect(() => {
    if (emailMarketing) reset(emailMarketing);
  }, [emailMarketing, reset]);

  // General Settings submit
  const onSubmit = async (data: EmailMarketingGeneralSettings) => {
    try {
      await dispatch(createEmailMarketing({ data })).unwrap();
    } catch (err) {}
  };

  // Subscriber actions
  const handleDeleteAll = async () => {
    try {
      setDeleteLoading(true);
      const res = await dispatch(deleteAllSubscribers()).unwrap();
      successMessage(res.message);
      setOpenDeleteModal(false);
      dispatch(getEmailMarketing());
    } catch (err: any) {
      errorMessage(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleExportSubscribers = async () => {
    try {
      const blob = await dispatch(exportSubscribers()).unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "subscribers.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    error,
    loading,
    emailMarketing,
    // General
    form,
    allowNewsletterSubscriptions,
    showNewsletterSummary,
    onSubmit,
    handleCancel: () => reset(),
    // Subscriber
    openDeleteModal,
    setOpenDeleteModal,
    deleteLoading,
    handleDeleteAll,
    handleExportSubscribers,
  };
};

export default useEmailMarketingContainer;