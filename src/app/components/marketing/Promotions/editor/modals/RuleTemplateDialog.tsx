"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ChevronUp, ShoppingCart, Truck } from "lucide-react";
import { ComponentType, useState } from "react";
import {
  CART_TEMPLATES,
  emptyRule,
  RuleTemplate,
  SHIPPING_TEMPLATES,
} from "../constant";
import { LINK_BUTTON, PRIMARY_BUTTON, TEXT } from "../styles";
import { RuleValues } from "../types";

const CUSTOM = "custom";

const TEMPLATE_GROUPS: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  templates: RuleTemplate[];
}[] = [
  { label: "Cart", icon: ShoppingCart, templates: CART_TEMPLATES },
  { label: "Shipping", icon: Truck, templates: SHIPPING_TEMPLATES },
];

const ALL_TEMPLATES = [...CART_TEMPLATES, ...SHIPPING_TEMPLATES];

const TemplateGroup = ({
  label,
  icon: Icon,
  templates,
}: (typeof TEMPLATE_GROUPS)[number]) => {
  return (
    <Collapsible defaultOpen className="group border-t border-gray-200">
      <CollapsibleTrigger
        className={cn(
          TEXT,
          "w-full flex items-center justify-between py-4 cursor-pointer",
        )}
      >
        <span className="flex items-center gap-3">
          <Icon className="size-7" />
          {label}
        </span>
        <ChevronUp className="size-7 transition-transform group-data-[state=closed]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {templates.map((template) => (
          <label
            key={template.key}
            className="flex items-start gap-4 py-4 border-t border-gray-200 cursor-pointer"
          >
            <RadioGroupItem value={template.key} className="mt-1" />
            <span className="flex flex-col gap-1">
              <span className={cn(TEXT, "text-gray-900")}>
                {template.label}
              </span>
              <span className="text-lg! 2xl:text-[1.4rem]! text-gray-500">
                {template.description}
              </span>
            </span>
          </label>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

const RuleTemplateDialog = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (rule: RuleValues) => void;
}) => {
  const [selected, setSelected] = useState(CUSTOM);

  const add = () => {
    const template = ALL_TEMPLATES.find((t) => t.key === selected);
    onSelect(template ? template.build() : emptyRule());
    setSelected(CUSTOM);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="sm:max-w-[64rem] p-10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl! 2xl:text-[2.4rem]! font-normal!">
            Choose a rule for your promotion
          </DialogTitle>
        </DialogHeader>

        <RadioGroup value={selected} onValueChange={setSelected} className="gap-0">
          <label className="flex items-center gap-4 py-5 cursor-pointer">
            <RadioGroupItem value={CUSTOM} />
            <span className={TEXT}>Custom</span>
          </label>
          {TEMPLATE_GROUPS.map((group) => (
            <TemplateGroup key={group.label} {...group} />
          ))}
        </RadioGroup>

        <DialogFooter className="mt-4 gap-4">
          <Button
            type="button"
            variant="link"
            className={LINK_BUTTON}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="xl"
            className={PRIMARY_BUTTON}
            onClick={add}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RuleTemplateDialog;
