import { cn } from "@/lib/utils";
import { CircleCheck, Info, TriangleAlert } from "lucide-react";
import { SettingsNoticeProps } from "./type";

const TONE_CLASS = {
  info: "border-blue-500 bg-blue-50",
  warning: "border-yellow-500 bg-yellow-50",
  success: "border-green-500 bg-green-50",
};

const TONE_ICON = {
  info: <Info className="size-8 shrink-0 fill-blue-600 text-white" />,
  warning: (
    <TriangleAlert className="size-8 shrink-0 fill-yellow-500 text-white" />
  ),
  success: <CircleCheck className="size-8 shrink-0 fill-green-600 text-white" />,
};

// Callout with a coloured left border: "info" (blue), "warning" (yellow) or "success" (green)
const SettingsNotice = ({
  tone = "info",
  showIcon,
  children,
}: SettingsNoticeProps) => (
  <div className={cn("flex items-start gap-3 border-l-4 p-4", TONE_CLASS[tone])}>
    {showIcon && TONE_ICON[tone]}
    <p className="text-[1.4rem]! text-gray-700!">{children}</p>
  </div>
);

export default SettingsNotice;
