import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { DEFAULT_LOADING_TEXT } from "./constant";
import { LoadingOverlayProps } from "./type";

// Centered spinner over existing content. The parent must be `relative`;
// dim the content with LOADING_DIM_CLASS. Content stays mounted underneath,
// so use this (not skeletons) when refreshing data that's already shown.
const LoadingOverlay = ({
  text = DEFAULT_LOADING_TEXT,
  className,
}: LoadingOverlayProps) => (
  <div
    role="status"
    className={cn(
      "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/50 backdrop-blur-[1px]",
      className,
    )}
  >
    <Loader2 className="size-10 animate-spin text-blue-600" />
    {text && (
      <span className="text-[1.4rem]! font-medium! text-slate-gray-blue!">
        {text}
      </span>
    )}
  </div>
);

export default LoadingOverlay;
