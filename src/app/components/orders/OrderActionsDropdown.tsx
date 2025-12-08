import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

interface OrderActionsDropdownProps {
  actions: {
    label: string;
    onClick?: () => void;
  }[];
  trigger: ReactNode;
}

const OrderActionsDropdown: React.FC<OrderActionsDropdownProps> = ({
  actions,
  trigger,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-52 space-y-2 z-50"
        align="end"
        sideOffset={5}
        // Prevents clicks from closing prematurely
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick?.();
            }}
            className="cursor-pointer"
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActionsDropdown;
