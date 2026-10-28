import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ShareNetworkToggleProps } from "./type";

// On/off tile for one share network; plug into
// <InputField Component={ShareNetworkToggle} network={...}>
const ShareNetworkToggle = ({
  network,
  value = false,
  onChange,
  id,
}: ShareNetworkToggleProps) => {
  const Icon = network.icon;
  const offClassName = network.iconOnly
    ? "text-gray-400"
    : "bg-gray-300 text-white";

  return (
    <Button
      id={id}
      type="button"
      variant="ghost"
      aria-pressed={value}
      aria-label={`${network.label} sharing ${value ? "on" : "off"}`}
      title={network.label}
      onClick={() => onChange?.(!value)}
      className={cn(
        "size-20 rounded-none transition-colors hover:opacity-90 [&_svg:not([class*='size-'])]:size-10",
        value ? network.activeClassName : offClassName,
        network.iconOnly && "bg-transparent hover:bg-transparent",
      )}
    >
      <Icon />
    </Button>
  );
};

export default ShareNetworkToggle;
