import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const OrderActionsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-xl cursor-pointer">
          •••
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 space-y-2 ">
        <DropdownMenuItem>Edit order</DropdownMenuItem>
        <DropdownMenuItem>Print invoice</DropdownMenuItem>
        <DropdownMenuItem>Print packing slip</DropdownMenuItem>
        <DropdownMenuItem>Resend invoice</DropdownMenuItem>
        <DropdownMenuItem>View notes</DropdownMenuItem>
        <DropdownMenuItem>View shipments</DropdownMenuItem>
        <DropdownMenuItem>Refund</DropdownMenuItem>
        <DropdownMenuItem>View order timeline</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActionsDropdown;
