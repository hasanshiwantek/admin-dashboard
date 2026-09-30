import { Check, X } from "lucide-react";

interface EnableDisableProps<T> {
  enabled: boolean;
  data: T;
  handleToggle: (data: T) => void;
}

export default function EnableDisable<T>({
  enabled,
  data,
  handleToggle,
}: EnableDisableProps<T>) {
  return enabled ? (
    <Check
      className="text-green-500 w-8 h-8 cursor-pointer"
      onClick={() => handleToggle(data)}
    />
  ) : (
    <X
      className="text-red-500 w-8 h-8 cursor-pointer"
      onClick={() => handleToggle(data)}
    />
  );
}
