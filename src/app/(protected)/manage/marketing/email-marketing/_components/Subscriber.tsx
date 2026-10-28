"use client";
import PageTitle from "@/components/ui/PageTitle";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  deleteAllSubscribers,
  exportSubscribers,
  getEmailMarketing,
} from "@/redux/slices/marketingSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { useState } from "react";
import ConfirmationModal from "../../../user-settings/additional-authentication/helpers/ConfirmationModal";

const Subscriber = () => {
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { emailMarketing } = useAppSelector(
    (state: any) => state.marketingReducer,
  );

  const handleDeleteAll = async () => {
    try {
      setLoading(true);
      const res = await dispatch(deleteAllSubscribers()).unwrap();

      successMessage(res.message);

      setOpenDeleteModal(false);

      dispatch(getEmailMarketing()); // subscriber count refresh
    } catch (err: any) {
      errorMessage(err);
    } finally {
      setLoading(false);
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

  return (
    <>
      <div>
        <div className="bg-blue-100 border-l-6 border-blue-500 p-5 mb-6 shadow-md">
          <p className="text-2xl! text-gray-700">
            If you are using a third party email service, email subscribers can
            also be synced to your email marketing provider.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Explore email marketing apps
            </a>
            .
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <PageTitle
          title="Export Newsletter Subscribers"
          titleClassName="text-4xl! font-semibold! text-gray-900"
          hideActionButton
        />
        <div className="bg-white shadow-sm border border-gray-200 p-10">
          <div className="flex items-center gap-6 py-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl! text-gray-700 font-medium!">
                Subscriber Count:
              </span>
              <span className="font-semibold text-2xl!">
                {emailMarketing?.subscriptionsCount}
              </span>
            </div>
            <div className="text-xl! text-gray-700">
              <span className="text-2xl!">(</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleExportSubscribers();
                }}
                className="text-blue-600 hover:underline"
              >
                Download to CSV file
              </a>
              <span className="text=[#000000] px-2">or</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDeleteModal(true);
                }}
                className="text-blue-600 hover:underline"
              >
                Delete all subscribers
              </a>
              <span className="text-2xl!">)</span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
  open={openDeleteModal}
  onOpenChange={setOpenDeleteModal}
  onConfirm={handleDeleteAll}
  loading={loading}
  variant="warning"
  title="Delete All Subscribers?"
  description="Are you sure you want to delete all subscribers?"
/>
    </>
  );
};

export default Subscriber;