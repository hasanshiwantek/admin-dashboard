import { StarRating } from "./StarRating"; // move the component or inline it

export const getReviewColumns = (onProductClick: (review: any) => void) => [
  {
    key: "product",
    header: "Product",
    width: "35%",
    headClassName: "2xl:!text-[1.6rem]",
    className: "whitespace-normal break-words",
    render: (review: any) => (
      <div>
        <span
          onClick={() => onProductClick(review)}
          className="!text-[#6F8DFD] !font-normal hover:underline cursor-pointer !text-[15px] 2xl:!text-2xl block max-w-[500px]"
        >
          {review?.product?.name || "—"}
        </span>
        {review.subject && (
          <p className="!text-[#34313F] !text-lg 2xl:!text-[14px] mt-1">
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
    headClassName: "2xl:!text-[1.6rem]",
    render: (review: any) => <StarRating rating={review.rating ?? 0} />,
  },
  {
    key: "postedBy",
    header: "Posted By",
    width: "20%",
    headClassName: "2xl:!text-[1.6rem]",
    className: "2xl:!text-2xl",
    render: (review: any) => review?.name || review.user?.name || "—",
  },
  {
    key: "date",
    header: "Date",
    width: "15%",
    headClassName: "2xl:!text-[1.6rem]",
    className: "2xl:!text-2xl",
    render: (review: any) => {
      if (!review.created_at) return "—";
      return new Date(review.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    },
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    headClassName: "2xl:!text-[1.6rem]",
    className: "2xl:!text-2xl",
    render: (review: any) => (
      <span
        className={
          review.approved === 1 ? "text-[#008000]" : "text-[#34313f]"
        }
      >
        {review.approved === 1 ? "Approved" : "Pending"}
      </span>
    ),
  },
];