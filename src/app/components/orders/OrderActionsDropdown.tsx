import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ReactNode, useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-52 space-y-2 z-50"
        align="end"
        sideOffset={5}
      >
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false); // ✅ Close dropdown immediately

              // ✅ Delay action execution slightly
              setTimeout(() => {
                action.onClick?.();
              }, 100);
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
