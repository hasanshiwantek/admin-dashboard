import { ReactNode } from "react";

export interface ListRendererProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string | number;

  isLoading?: boolean;
  skeletonCount?: number;
  renderSkeleton?: (index: number) => ReactNode;

  error?: string | ReactNode;
  onRetry?: () => void;

  emptyComponent?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  orientation?: "vertical" | "horizontal";
  className?: string;
  itemClassName?: string;
}

export function ListRenderer<T>({
  data,
  renderItem,
  keyExtractor,
  isLoading = false,
  skeletonCount = 3,
  renderSkeleton,
  error,
  onRetry,
  emptyComponent,
  header,
  footer,
  orientation = "vertical",
  className = "",
  itemClassName = "",
}: ListRendererProps<T>) {
  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        <p className="text-red-500 font-medium mb-2">
          {typeof error === "string" ? error : "Failed to load data."}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`flex ${orientation === "horizontal" ? "flex-row space-x-4" : "flex-col space-y-3"} ${className}`}
      >
        {header}
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={`skeleton-${index}`} className={itemClassName}>
            {renderSkeleton ? (
              renderSkeleton(index)
            ) : (
              <div className="animate-pulse bg-gray-200 h-12 w-full rounded-md" />
            )}
          </div>
        ))}
        {footer}
      </div>
    );
  }

  if (!data || data?.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        {header}
        {emptyComponent || (
          <p className="text-gray-500 text-sm">No items found.</p>
        )}
        {footer}
      </div>
    );
  }

  return (
    <div
      className={`flex ${orientation === "horizontal" ? "flex-row space-x-4 overflow-x-auto" : "flex-col space-y-3"} ${className}`}
    >
      {header}
      {data?.map((item, index) => (
        <div key={keyExtractor(item, index)} className={itemClassName}>
          {renderItem(item, index)}
        </div>
      ))}
      {footer}
    </div>
  );
}
