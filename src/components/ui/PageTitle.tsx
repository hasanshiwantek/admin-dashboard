import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button, ButtonProps } from "./Button";
import { cn } from "@/lib/utils";

export interface PageTitleProps {
  title: string;
  description?: string | ReactNode;
  buttonText?: string;
  buttonProps?: ButtonProps;
  onButtonClick?: () => void;
  icon?: ReactNode;
  hideActionButton?: boolean;
  /** Shown right after the title, e.g. a status badge */
  titleAdornment?: ReactNode;
  /** Replaces the default action button, e.g. an actions menu */
  action?: ReactNode;
  containerClassName?: string;
  textContainerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const PageTitle = ({
  title = "",
  description,
  buttonText = "Add new",
  buttonProps = {},
  onButtonClick,
  icon = <Plus className="w-6! h-6! mr-1!" />,
  hideActionButton,
  titleAdornment,
  action,
  containerClassName,
  textContainerClassName,
  titleClassName,
  descriptionClassName,
}: PageTitleProps) => {
  const { className, size = "xl", ...restButtonProps } = buttonProps;

  return (
    <div
      className={cn(
        "flex justify-between items-center mb-4",
        containerClassName,
      )}
    >
      <div className={cn("flex flex-col gap-6 mb-5", textContainerClassName)}>
        <div className="flex items-center gap-6">
          <h1
            className={cn(
              "text-5xl 2xl:text-[3.2rem] font-extralight text-gray-600",
              titleClassName,
            )}
          >
            {title}
          </h1>
          {titleAdornment}
        </div>
        {description && (
          <p
            className={cn("text-base text-gray-500", descriptionClassName)}
          >
            {description}
          </p>
        )}
      </div>
      {action}
      {!action && !hideActionButton && (
        <Button
          variant="primary"
          size={size}
          onClick={onButtonClick}
          className={cn(
            "flex justify-start items-center text-2xl! 2xl:text-[1.6rem]!",
            className,
          )}
          {...restButtonProps}
        >
          {icon} {buttonText}
        </Button>
      )}
    </div>
  );
};

export default PageTitle;
