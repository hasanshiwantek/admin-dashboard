import { cn } from "@/lib/utils";

type ValidationErrorProps = {
  message?: unknown;
  className?: string;
};

export function ValidationError({ message, className }: ValidationErrorProps) {
  if (!message) return null;

  return <p className={cn("error-message", className)}>{String(message)}</p>;
}
