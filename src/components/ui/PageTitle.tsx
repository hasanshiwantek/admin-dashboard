import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface PageTileProps {
  title: string;
  description?: string | ReactNode;
  buttonText?: string;
  buttonProps?: ButtonProps;
  onButtonClick?: () => void;
  icon?: ReactNode;
  hideActionButton?: boolean;
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
  containerClassName,
  textContainerClassName,
  titleClassName,
  descriptionClassName,
}: PageTileProps) => {
  const { className, size = "xl", ...restButtonProps } = buttonProps;

  return (
    <div
      className={cn(
        "flex justify-between items-center mb-4",
        containerClassName,
      )}
    >
      <div className={cn("flex flex-col gap-6 mb-5", textContainerClassName)}>
        <h1
          className={cn(
            "text-5xl 2xl:text-[3.2rem] font-extralight text-gray-600",
            titleClassName,
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn("text-base text-gray-500", descriptionClassName)}
          >
            {description}
          </p>
        )}
      </div>
      {!hideActionButton && (
        <Button
          size={size}
          onClick={onButtonClick}
          className={cn(
            "btn-primary flex justify-start items-center text-2xl! 2xl:text-[1.6rem]!",
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
