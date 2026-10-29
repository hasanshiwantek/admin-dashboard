import { ReviewFormNames } from "@/app/(protected)/manage/products/reviews/[id]/constant";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";
import { FormFieldsSkeletonProps } from "./type";

const FormFieldsSkeleton = ({
  fields,
  layout = "horizontal",
  className,
}: FormFieldsSkeletonProps) => (
  <ListRenderer
    data={fields}
    keyExtractor={(_, index) => index}
    className={cn("gap-8 space-y-0!", className)}
    renderItem={(name) => (
      <div
        aria-hidden
        className={cn(
          layout === "horizontal"
            ? "grid grid-cols-[14rem_1fr] items-start gap-x-8 2xl:grid-cols-[18rem_1fr]"
            : "flex flex-col gap-2",
        )}
      >
        <Skeleton
          className={cn(
            "h-[1.8rem] w-[9rem]",
            layout === "horizontal" && "mt-3 justify-self-end",
          )}
        />
        <Skeleton
          className={cn(
            "w-full max-w-md",
            name === ReviewFormNames.Comment ? "h-[6.4rem]" : "h-[3.2rem]",
          )}
        />
      </div>
    )}
  />
);

export default FormFieldsSkeleton;
