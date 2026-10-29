"use client";

import InputField from "@/components/form/InputField";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { GeneralSection, ShareField, shareNetworks } from "../constant";
import { fieldPath } from "../utils";
import SectionCard from "@/components/SectionCard/SectionCard";
import ShareNetworkToggle from "./ShareNetworkToggle";

const name = (field: ShareField) => fieldPath(GeneralSection.Share, field);

const ShareSection = () => {
  // Purely visual disclosure, not a setting
  const [showMore, setShowMore] = useState(false);

  return (
    <SectionCard
      title="Social Sharing Settings"
      description="Share controls are displayed on product pages and blog posts. Click a network to turn it on or off."
    >
      <ListRenderer
        data={shareNetworks}
        keyExtractor={(network) => network.field}
        orientation="horizontal"
        className="max-w-xl flex-wrap gap-3 space-x-0! overflow-visible!"
        renderItem={(network) => (
          <InputField
            name={name(network.field)}
            layout="vertical"
            Component={ShareNetworkToggle}
            network={network}
          />
        )}
      />

      <Button
        type="button"
        variant="link"
        onClick={() => setShowMore((open) => !open)}
        className="h-auto w-fit p-0 text-link"
      >
        <ChevronRight
          className={cn("transition-transform", showMore && "rotate-90")}
        />
        More options
      </Button>

      {showMore && (
        <InputField
          name={name(ShareField.PoweredByLink)}
          label="'Powered by Bigcommerce' link in eBay store"
          Component={Switch}
          valuePropName="checked"
          changePropName="onCheckedChange"
        />
      )}
    </SectionCard>
  );
};

export default ShareSection;
