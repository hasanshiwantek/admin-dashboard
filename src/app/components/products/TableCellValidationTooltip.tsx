import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ValidationTooltip = ({ message }: { message: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        type="button"
        aria-label={message}
        className="validation-dot absolute right-2 top-2 z-10"
      />
    </TooltipTrigger>

    <TooltipContent
      side="right"
      align="center"
      sideOffset={8}
      collisionPadding={8}
      avoidCollisions
      className="text-xl p-3"
    >
      {message}
    </TooltipContent>
  </Tooltip>
);

export default ValidationTooltip;
