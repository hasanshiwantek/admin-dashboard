import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getReviewById, updateReview } from "@/redux/slices/reviewSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { ReviewSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { REVIEWS_ROUTE } from "../constant";
import type { Review } from "../type";
import { reviewDefaults } from "./constant";
import type { ReviewFormValues } from "./type";
import { transformGetReview, transformPostReview } from "./utils";

const useReviewFormPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id: idParam } = useParams<{ id: string }>();
  const id = Number(idParam);
  if (!id) notFound();

  const { currentReview, currentReviewLoading } = useAppSelector(
    (state) => state.review,
  ) as { currentReview: Review | null; currentReviewLoading: boolean };

  const form = useForm<ReviewFormValues>({
    resolver: yupResolver(ReviewSchema),
    defaultValues: reviewDefaults,
  });
  const { reset, formState } = form;

  useEffect(() => {
    dispatch(getReviewById({ id }));
  }, [dispatch, id]);

  // Ignore a review left in the store from a previously opened page
  const record = currentReview?.id === id ? currentReview : null;

  useEffect(() => {
    if (record) reset(transformGetReview(record));
  }, [record, reset]);

  const onSubmit = async (values: ReviewFormValues) => {
    const result = await dispatch(
      updateReview({ id, data: transformPostReview(values) }),
    );
    if (updateReview.rejected.match(result)) {
      errorMessage(result.payload as string);
      return;
    }
    successMessage("Review updated");
    router.push(REVIEWS_ROUTE);
  };

  return {
    form,
    loading: currentReviewLoading && !record,
    saving: formState.isSubmitting,
    onSubmit,
    handleCancel: () => router.push(REVIEWS_ROUTE),
  };
};

export default useReviewFormPageContainer;
