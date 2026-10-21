"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useParams } from "next/navigation";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getReviewById, updateReview } from "@/redux/slices/reviewSlice";
import { ReviewSchema } from "@/validations/formValidations";
import { ReviewFormValues } from "./helper/type";
import {
  transformGetReviewPayload,
  transformPostReviewPayload,
} from "./helper/utils";
import {
  RATING_OPTIONS,
  REVIEW_STATUS_OPTIONS,
  reviewDefaultValues,
  ReviewField,
  ReviewStatus,
} from "./helper/constant";
import { errorMessage } from "@/utils/message";

const LIST_PATH = "/manage/products/reviews";

const EditReview = () => {
  const params = useParams();
  const reviewId = params?.id as string;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { currentReview, loading } = useAppSelector(
    (state: any) => state?.review,
  );

  const form = useForm<ReviewFormValues>({
    resolver: yupResolver(ReviewSchema),
    defaultValues: reviewDefaultValues,
  });
  const { control, reset } = form;

  const onSubmit = async (values: ReviewFormValues) => {
    const payload = transformPostReviewPayload(values);
    const result = await dispatch(
      updateReview({ id: reviewId, data: payload }),
    );
    if (updateReview.rejected.match(result)) {
      errorMessage((result.payload as string) || "Failed to update review");
      return;
    }

    router.push(LIST_PATH);
  };
  // Fetch review on mount
  useEffect(() => {
    if (reviewId) {
      dispatch(getReviewById({ id: reviewId }));
    }
  }, [reviewId, dispatch]);

  useEffect(() => {
    const data = currentReview?.data ?? currentReview;
    if (data && String(data.id) === String(reviewId)) {
      reset(transformGetReviewPayload(data));
    }
  }, [currentReview, reviewId, reset]);
  return (
    <PageLayout>
      <PageTitle
        title="Edit Review"
        description="Edit the review details in the form below."
        hideActionButton
      />

      <Form
        form={form}
        onSubmit={onSubmit}
        footer={{
          submitText: "Save",
          onCancel: () => router.push(LIST_PATH),
          loading: form.formState.isSubmitting,
          disabled: loading,
        }}
      >
        <InputField
          name={ReviewField.Name}
          label="Review Title"
          required
          control={control}
        />

        <InputField
          name={ReviewField.Comment}
          label="Review"
          control={control}
          isTextArea
          controlClassName="max-w-md"
        />

        <InputField
          name={ReviewField.UserName}
          label="Author"
          control={control}
        />

        <InputField
          name={ReviewField.Approved}
          label="Status"
          required
          Component={SelectField}
          control={control}
          options={REVIEW_STATUS_OPTIONS}
        />

        <InputField
          name={ReviewField.Rating}
          label="Rating"
          required
          Component={SelectField}
          control={control}
          options={RATING_OPTIONS}
        />
      </Form>
    </PageLayout>
  );
};

export default EditReview;
