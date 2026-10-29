import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { cn } from "@/lib/utils";
import { STAR_COUNT, STAR_PATH } from "./constant";
import { StarRatingProps } from "./type";

const STARS = Array.from({ length: STAR_COUNT }, (_, index) => index + 1);

const StarRating = ({ rating, className }: StarRatingProps) => (
  <ListRenderer
    data={STARS}
    keyExtractor={(star) => star}
    orientation="horizontal"
    className={cn(
      "items-center gap-0.5 space-x-0! overflow-visible!",
      className,
    )}
    renderItem={(star) => (
      <svg
        aria-hidden
        className={cn(
          "h-6 w-6",
          star <= rating ? "text-yellow-400" : "text-gray-300",
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d={STAR_PATH} />
      </svg>
    )}
  />
);

export default StarRating;
