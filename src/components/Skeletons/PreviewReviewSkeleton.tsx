import { Skeleton } from "@/components/Skeletons/Skeleton";

// Placeholder shaped like the loaded preview
const PreviewReviewSkeleton = () => (
  <div aria-busy className="flex flex-col">
    <Skeleton className="mb-2 h-12 w-1/2" />
    <Skeleton className="h-8 w-28" />
    <hr className="my-3 border-gray-300" />
    <Skeleton className="mb-2 h-12 w-full" />
    <Skeleton className="h-12 w-1/3" />
    <hr className="my-3 border-gray-300" />
    <Skeleton className="h-14 w-full" />
  </div>
);

export default PreviewReviewSkeleton;
