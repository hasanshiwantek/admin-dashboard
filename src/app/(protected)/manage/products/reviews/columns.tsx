import ActionButton from "@/components/ActionButton/ActionButton";
import { Button } from "@/components/ui/Button";
import { ColumnDef } from "@/components/ui/Table/types";
import StarRating from "@/components/StarRating/StarRating";
import { ActionEnums } from "@/const/appConstants";
import { cn } from "@/lib/utils";
import { REVIEW_ROW_ACTIONS } from "./constant";
import type { Review } from "./type";
import { formatReviewDate, getReviewAuthor, isReviewApproved } from "./utils";

export const getReviewColumns = ({
  onProductClick,
  onAction,
}: {
  onProductClick: (review: Review) => void;
  onAction: (review: Review) => (action: ActionEnums) => void;
}): ColumnDef<Review>[] => [
  {
    key: "product",
    header: "Product",
    width: "35%",
    headClassName: "2xl:text-[1.6rem]!",
    className: "whitespace-normal break-words",
    render: (review) => (
      <div>
        <Button
          type="button"
          variant="link"
          onClick={() => onProductClick(review)}
          className="block h-auto max-w-[500px] p-0 text-left text-[15px]! font-normal! whitespace-normal text-text-link! 2xl:text-2xl!"
        >
          {review.product?.name || "—"}
        </Button>
        {review.subject && (
          <p className="mt-1 text-lg! text-text-heading! 2xl:text-[14px]!">
            {review.subject}
          </p>
        )}
      </div>
    ),
  },
  {
    key: "rating",
    header: "Rating",
    width: "120px",
    headClassName: "2xl:text-[1.6rem]!",
    render: (review) => <StarRating rating={Number(review.rating ?? 0)} />,
  },
  {
    key: "postedBy",
    header: "Posted By",
    width: "20%",
    headClassName: "2xl:text-[1.6rem]!",
    className: "2xl:text-2xl!",
    render: getReviewAuthor,
  },
  {
    key: "date",
    header: "Date",
    width: "15%",
    headClassName: "2xl:text-[1.6rem]!",
    className: "2xl:text-2xl!",
    render: (review) => formatReviewDate(review.created_at),
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    headClassName: "2xl:text-[1.6rem]!",
    className: "2xl:text-2xl!",
    render: (review) => (
      <span
        className={cn(
          isReviewApproved(review) ? "text-pure-green" : "text-text-heading",
        )}
      >
        {isReviewApproved(review) ? "Approved" : "Pending"}
      </span>
    ),
  },
  {
    key: "actions",
    width: "60px",
    render: (review) => (
      <ActionButton
        data={review}
        actions={REVIEW_ROW_ACTIONS}
        onAction={onAction}
        label={`Actions for review ${review.id}`}
        align="end"
      />
    ),
  },
];
