"use client";

import Form from "@/components/form/Form";
import ReviewFormSkeleton from "@/components/Skeletons/FormFieldsSkeleton";
import SkeletonLoader from "@/components/Skeletons/SkeletonLoader";
import PageLayout from "@/components/ui/PageLayout";
import ReviewFormFields from "../_components/ReviewFormFields";
import { REVIEWS_ROUTE } from "../constant";
import { ReviewFormNames } from "./constant";
import useReviewFormPageContainer from "./container";

const ReviewFormPage = () => {
  const { form, loading, saving, onSubmit, handleCancel } =
    useReviewFormPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Reviews", href: REVIEWS_ROUTE }}
      title="Edit Review"
      titleProps={{
        description: "Edit the review details in the form below.",
        descriptionClassName: "text-xl! 2xl:text-2xl!",
      }}
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        footer={{
          submitText: "Save",
          loadingText: "Saving...",
          onCancel: handleCancel,
          loading: saving,
          disabled: loading,
        }}
      >
        <SkeletonLoader
          loading={loading}
          skeleton={
            <ReviewFormSkeleton fields={Object.values(ReviewFormNames)} />
          }
        >
          <ReviewFormFields />
        </SkeletonLoader>
      </Form>
    </PageLayout>
  );
};

export default ReviewFormPage;
