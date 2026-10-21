import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import BackNavigationButton, {
  BackNavigationButtonProps,
} from "./BackNavigationButton";
import PageTitle, { PageTitleProps } from "./PageTitle";

export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  backButton?: boolean | BackNavigationButtonProps;
  title?: string;
  titleProps?: Omit<PageTitleProps, "title">;
  headerClassName?: string;
}

const PageLayout = ({
  className,
  children,
  backButton,
  title,
  titleProps,
  headerClassName,
}: PageLayoutProps) => {
  const backButtonProps = typeof backButton === "object" ? backButton : {};
  const showHeader = !!backButton || !!title;

  return (
    <div className={cn("flex flex-col gap-4 px-20 py-12", className)}>
      {showHeader && (
        <div className={cn("flex flex-col gap-4 mb-4", headerClassName)}>
          {backButton && <BackNavigationButton {...backButtonProps} />}
          {title && (
            <PageTitle
              title={title}
              // Action button only shows when a handler is given, unless overridden
              hideActionButton={!titleProps?.onButtonClick}
              containerClassName="mb-0"
              textContainerClassName="mb-0"
              {...titleProps}
            />
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageLayout;
