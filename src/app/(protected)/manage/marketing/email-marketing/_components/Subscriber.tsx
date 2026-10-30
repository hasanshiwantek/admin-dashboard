"use client";

import PageTitle from "@/components/ui/PageTitle";
import ConfirmationModal from "../../../user-settings/additional-authentication/helpers/ConfirmationModal";
import { Button } from "@/components/ui/Button";

interface SubscriberProps {
  emailMarketing: any;
  openDeleteModal: boolean;
  setOpenDeleteModal: (v: boolean) => void;
  deleteLoading: boolean;
  handleDeleteAll: () => void;
  handleExportSubscribers: () => void;
}

const Subscriber = ({
  emailMarketing,
  openDeleteModal,
  setOpenDeleteModal,
  deleteLoading,
  handleDeleteAll,
  handleExportSubscribers,
}: SubscriberProps) => {
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
              <Button
                variant="link"
                onClick={(e) => {
                  e.preventDefault();
                  handleExportSubscribers();
                }}
                className="text-blue-600 text-[15px]! hover:underline"
              >
                Download to CSV file
              </Button>
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
        loading={deleteLoading}
        variant="warning"
        title="Delete All Subscribers?"
        description="Are you sure you want to delete all subscribers?"
      />
    </>
  );
};

export default Subscriber;