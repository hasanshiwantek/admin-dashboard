"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  ShieldOff,
  AlertTriangle,
} from "lucide-react";

type ConfirmVariant = "enable" | "disable" | "warning";

export default function ConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  loading,
  variant = "enable",
  title,
  description,
}: {
  open: boolean;
  loading?: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  variant?: ConfirmVariant;
  title?: string;
  description?: string;
}) {
  const config = {
    enable: {
      icon: <ShieldCheck className="h-5 w-5 text-green-600" />,
      iconBg: "bg-green-50",
      title: title || "Enable this feature?",
      description:
        description ||
        "Are you sure you want to enable this? This will take effect immediately.",
      confirmLabel: "Enable",
      confirmClass:
        "bg-[#4C6FFF] hover:bg-[#4163E8] text-white",
      headerClass: "bg-blue-500",
    },

    disable: {
      icon: <ShieldOff className="h-5 w-5 text-red-500" />,
      iconBg: "bg-red-50",
      title: title || "Disable this feature?",
      description:
        description ||
        "Are you sure you want to disable this? This will take effect immediately.",
      confirmLabel: "Disable",
      confirmClass:
        "bg-[#D42020] hover:bg-[#B91C1C] text-white",
      headerClass: "bg-[#D42020]",
    },

    warning: {
      icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
      iconBg: "bg-yellow-50",
      title: title || "Are you sure you want to leave?",
      description:
        description ||
        "You've made some changes. If you leave, they won't be saved.",
      confirmLabel: "Confirm",
      confirmClass:
        "bg-[#4C6FFF] hover:bg-[#4163E8] text-white",
      headerClass: "bg-[#4C6FFF]",
    },
  };

  const c = config[variant];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          !max-w-[608px]
          !p-0
          overflow-hidden
          rounded-none
          border-0
          shadow-2xl
          [&>button]:hidden
        "
      >
        {/* ================= HEADER ================= */}
        <div
          className={`
            ${c.headerClass}
            px-6
            py-5
          `}
        >
          <DialogTitle
            className="
              text-[18px]!
              font-semibold
              leading-6
              text-white!
              text-left
            "
          >
            {c.title}
          </DialogTitle>
        </div>

        {/* ================= BODY ================= */}
        <div className="px-6 py-6">
          <DialogDescription
            className="
              text-[13px]!
              font-normal
              leading-6
              text-[#6B7280]
              text-left
            "
          >
            {c.description}
          </DialogDescription>
        </div>

        {/* ================= FOOTER ================= */}
        <div
          className="
            flex
            justify-end
            items-center
            gap-5
            border-t
            border-[#E5E7EB]
            bg-[#F8F9FB]
            px-6
            py-4
          "
        >
          {/* Cancel */}
          <Button
            variant="ghost"
            type="button"
            className="
              h-10
              px-2
              text-[14px]
              font-medium
              text-[#4C6FFF]
              hover:bg-transparent
              hover:text-[#4163E8]
            "
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          {/* Confirm */}
          <Button
            type="button"
            disabled={loading}
            className={`
              h-12
              rounded-[4px]
              px-5
              text-[14px]
              font-medium
              ${c.confirmClass}
            `}
            onClick={onConfirm}
          >
            {loading ? "Please wait..." : c.confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}