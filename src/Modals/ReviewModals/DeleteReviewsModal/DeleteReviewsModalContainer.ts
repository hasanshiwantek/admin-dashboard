import { useAppDispatch } from "@/hooks/useReduxHooks";
import { deleteReview } from "@/redux/slices/reviewSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { DeleteReviewsModalProps } from "./type";

const useDeleteReviewsModalContainer = ({
  reviewIds,
  onDeleted,
}: Pick<DeleteReviewsModalProps, "reviewIds" | "onDeleted">) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const result = await dispatch(deleteReview({ ids: reviewIds }));
    if (deleteReview.rejected.match(result)) {
      errorMessage(result.payload as string);
      return false;
    }
    successMessage(reviewIds.length === 1 ? "Review deleted" : "Reviews deleted");
    onDeleted?.();
  };

  return { handleDelete };
};

export default useDeleteReviewsModalContainer;
