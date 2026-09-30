import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const PageLayout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn("flex flex-col gap-4 px-20 py-12", className)}>
      {children}
    </div>
  );
};

export default PageLayout;
