import { cn } from "@/lib/utils";
import { SettingsNoticeProps } from "./type";

const TONE_CLASS = {
  info: "border-blue-500 bg-blue-50",
  warning: "border-yellow-500 bg-yellow-50",
};

// Callout with a coloured left border: "info" (blue) or "warning" (yellow)
const SettingsNotice = ({ tone = "info", children }: SettingsNoticeProps) => (
  <div className={cn("border-l-4 p-4", TONE_CLASS[tone])}>
    <p className="text-[1.4rem]! text-gray-700!">{children}</p>
  </div>
);

export default SettingsNotice;
