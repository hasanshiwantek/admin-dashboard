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
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 space-y-2">
        {actions.map((action, index) => (
          <DropdownMenuItem key={index} onClick={action.onClick}>
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActionsDropdown;
