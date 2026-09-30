"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  deleteAllSubscribers,
  exportSubscribers,
  getEmailMarketing,
} from "@/redux/slices/marketingSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { useState } from "react";

const Subscriber = () => {
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { emailMarketing } = useAppSelector(
    (state: any) => state.marketingReducer,
  );

  const handleDeleteAll = async () => {
    try {
      const res = await dispatch(deleteAllSubscribers()).unwrap();

      successMessage(res.message);

      setOpenDeleteModal(false);

      dispatch(getEmailMarketing()); // subscriber count refresh
    } catch (err: any) {
      errorMessage(err);
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
          <p className="!text-2xl text-gray-700">
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
        <h2 className="!text-4xl !font-semibold text-gray-900">
          Export Newsletter Subscribers
        </h2>
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

      <AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <AlertDialogContent className="sm:max-w-[600px] w-[95%] rounded-2xl p-8">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-2xl font-semibold">
              Delete All Subscribers?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-base leading-7 text-gray-600">
              Are you sure you want to delete all subscribers?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-8 gap-3">
            <AlertDialogCancel className="h-11 px-6 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeleteAll}
              className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Subscriber;
