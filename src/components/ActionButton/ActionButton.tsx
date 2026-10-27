"use client";

import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionEnums } from "@/const/appConstants";
import { useAccess } from "@/hooks/useAccess";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import { ActionButtonProps } from "./type";

const ActionButton = <TData, TAction extends ActionEnums = ActionEnums>({
  data,
  actions,
  onAction,
  label = "Actions",
  icon = <Ellipsis className="size-7" />,
  align = "end",
  triggerProps,
  contentClassName,
}: ActionButtonProps<TData, TAction>) => {
  const { filterByAccess } = useAccess();
  const handleAction = onAction(data);
  const visibleActions = filterByAccess(
    actions,
    data as Record<string, unknown>,
  );

  if (!visibleActions.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={label}
          {...triggerProps}
        >
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={cn("min-w-[22rem]", contentClassName)}
      >
        <ListRenderer
          data={visibleActions}
          keyExtractor={(action) => action.type}
          emptyComponent={<></>}
          className="space-y-0!"
          renderItem={(action) => (
            <DropdownMenuItem
              disabled={action.disabled}
              onSelect={() => handleAction(action.type)}
              className={cn(
                "cursor-pointer px-6 py-3 text-[1.4rem] outline-none!",
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
