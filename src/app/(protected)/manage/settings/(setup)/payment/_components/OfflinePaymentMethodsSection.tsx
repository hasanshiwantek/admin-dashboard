"use client";

import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";
import { ChevronDown } from "lucide-react";
import OfflinePaymentMethodRow from "./OfflinePaymentMethodRow";
import { OfflinePaymentMethodsSectionProps } from "./type";

const OfflinePaymentMethodsSection = ({
  methods,
}: OfflinePaymentMethodsSectionProps) => (
  <Collapsible className="group rounded-sm bg-white shadow-sm">
    <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between px-12 py-12 text-left">
      <span className="text-[1.5rem] font-semibold text-muted-plum-gray">
        Offline payment methods
      </span>
      <ChevronDown className="size-7 text-black transition-transform group-data-[state=open]:rotate-180" />
    </CollapsibleTrigger>

    <CollapsibleContent>
      <ListRenderer
        data={methods}
        keyExtractor={(method) => method.tab}
        className="space-y-0! divide-y divide-border-light border-t border-border-light"
        renderItem={(method) => <OfflinePaymentMethodRow method={method} />}
      />
    </CollapsibleContent>
  </Collapsible>
);

export default OfflinePaymentMethodsSection;
