import { SkeletonLoaderProps } from "./type";

const SkeletonLoader = ({
  loading,
  skeleton,
  children,
}: SkeletonLoaderProps) => <>{loading ? skeleton : children}</>;

export default SkeletonLoader;
