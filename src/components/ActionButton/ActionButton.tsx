"use client";

import { ActionEnums } from "@/const/appConstants";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import { ActionButtonProps } from "./type";

// "…" button that opens a menu of actions for `data`
const ActionButton = <TData, TAction extends ActionEnums = ActionEnums>({
  data,
  actions,
  onAction,
  label = "Actions",
  icon = <Ellipsis className="size-7" />,
  align = "end",
  triggerClassName,
  contentClassName,
}: ActionButtonProps<TData, TAction>) => {
  const handleAction = onAction(data);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={label}
          className={triggerClassName}
        >
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={cn("min-w-[22rem]", contentClassName)}
      >
        <ListRenderer
          data={actions}
          keyExtractor={(action) => action.type}
          emptyComponent={<></>}
          className="space-y-0!"
          renderItem={(action) => (
            <DropdownMenuItem
              disabled={action.disabled}
              onSelect={() => handleAction(action.type)}
              className={cn(
                "cursor-pointer px-6 py-3 text-[1.4rem]",
                action.className,
              )}
            >
              {action.label}
            </DropdownMenuItem>
          )}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionButton;
