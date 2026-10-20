import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { InlineFieldRowProps } from "./type";

// A label plus several controls on one line, e.g. "[ 3 ] levels deep".
// Same column grid as InputField's horizontal layout, so labels line up.
const InlineFieldRow = ({ label, children, className }: InlineFieldRowProps) => (
  <div className="grid grid-cols-[14rem_1fr] items-start gap-x-8 2xl:grid-cols-[18rem_1fr]">
    {label ? (
      <Label className="justify-end pt-3 text-right font-normal text-gray-600 2xl:text-2xl!">
        {label}
      </Label>
    ) : (
      <span />
    )}
    <div className={cn("flex flex-wrap items-start gap-3", className)}>
      {children}
    </div>
  </div>
);

export default InlineFieldRow;
