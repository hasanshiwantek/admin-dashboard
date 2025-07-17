import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface OrderActionsDropdownProps {
  actions: {
    label: string;
    onClick?: () => void;
  }[];
}

const OrderActionsDropdown: React.FC<OrderActionsDropdownProps> = ({ actions }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-xl cursor-pointer">
          •••
        </Button>
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
