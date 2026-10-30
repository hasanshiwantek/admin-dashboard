import { ReactNode } from "react";

export interface ReviewFormSkeletonProps {
  fields: Array<string>;
  layout?: "horizontal" | "vertical";
  className?: string;
}

export interface SkeletonLoaderProps {
  loading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
}
