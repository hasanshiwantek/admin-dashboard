import { Button } from "@/components/ui/Button";
import { Copy } from "lucide-react";
import { OrderSectionHeaderProps } from "./types";

export default function OrderSectionHeader({
  title,
  onCopy,
}: OrderSectionHeaderProps) {
  return (
    <div className="flex flex-col items-end gap-3">
      <h4 className="text-[1.8rem] leading-none font-semibold text-text-heading">
        {title}
      </h4>
      {onCopy && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="my-0 h-auto px-3 py-1.5 text-[1.2rem]"
          onClick={onCopy}
        >
          <Copy className="size-4" />
          Copy
        </Button>
      )}
    </div>
  );
}
