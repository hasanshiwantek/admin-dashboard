import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface PageTileProps {
  title: string;
  buttonText?: string;
  buttonProps?: ButtonProps;
  onButtonClick?: () => void;
  icon?: ReactNode;
}

const PageTile = ({
  title = "",
  buttonText = "Add new",
  buttonProps = {},
  onButtonClick,
  icon = <Plus className="w-6! h-6! mr-1!" />,
}: PageTileProps) => {
  const { className, size = "xl", ...restButtonProps } = buttonProps;

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-5xl 2xl:text-[3.2rem] font-extralight text-gray-600 my-5">
        {title}
      </h1>
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
    </div>
  );
};

export default PageTile;
